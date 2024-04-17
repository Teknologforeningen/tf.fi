import crypto from 'crypto'
import { fetchContentPage } from '@lib/strapi/contentpage'
import { fetchSection } from '@lib/strapi/contentSection'
import { PageType } from '@models/page'
import { SingleResponse } from '@lib/strapi'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

const API_KEY = process.env.API_KEY

export async function POST(request: NextRequest) {
  const bearer = request.headers
    .get('authorization')
    ?.split('Bearer:')[1]
    ?.trim()
  if (
    bearer &&
    API_KEY &&
    crypto.timingSafeEqual(Buffer.from(bearer), Buffer.from(API_KEY))
  ) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  try {
    const tag = request.nextUrl.searchParams.get('tag')
    if (tag) {
      // Manual API call
      revalidateTag(tag)
      return NextResponse.json({ revalidated: true, now: Date.now() })
    } else {
      const body = await request.json()
      // Strapi webhook
      const model = body?.model

      switch (model) {
        case 'content-page': {
          const category = body?.entry.category?.slug
          const page = body.entry.slug
          if (!page) {
            return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
          }
          revalidatePath(`/${category}/${page}`)
          revalidateTag('navbar')
          break
        }
        case 'category': {
          const category = body?.entry?.slug
          for (const page of body?.entry?.content_pages) {
            revalidatePath(`/${category}/${page?.slug}`)
          }
          revalidateTag('navbar')
          break
        }
        case 'content-section': {
          const page = body?.entry?.content_page?.slug
          const pageData = await fetchContentPage(page)
          const category = pageData?.category?.data?.attributes?.slug
          revalidatePath(`/${category}/${page}`)
          break
        }
        case 'file-folder': {
          const section = await fetchSection(body?.entry?.content_section?.id)

          const pageData = section?.attributes?.content_page?.data as
            | SingleResponse<PageType>
            | undefined

          const page = pageData?.attributes.slug
          const category = pageData?.attributes.category?.data?.attributes?.slug
          revalidatePath(`/${category}/${page}`)
          break
        }
        case 'post': {
          // For some unexplained reason, revalidating the specific post page does not work properly.
          // const post = body?.entry?.slug
          // revalidatePath(`/nyheter/${post}`)

          // Revalidating all posts with revalidatePath('/nyheter/[slug]') works for the time being,
          // with the downside of causing some unnecessary revalidates.
          revalidatePath('/nyheter/[slug]', 'page')
          revalidatePath('/nyheter', 'page')
          revalidatePath('/', 'page')
          break
        }
        case 'navbar': {
          revalidateTag('navbar')
          break
        }
        case 'private-page': {
          revalidateTag('navbar')
          break
        }
        case 'homepage': {
          revalidatePath('/')
          break
        }
        case 'footer': {
          revalidateTag('footer')
          break
        }

        default:
          return NextResponse.json({ error: 'Invalid model' }, { status: 400 })
      }

      return NextResponse.json({ revalidated: true, now: Date.now() })
    }
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { revalidated: false, now: Date.now() },
      { status: 500 }
    )
  }
}
