import type { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import { fetchContentPage } from '@lib/api/contentpage'
import { fetchSection } from '@lib/api/contentSection'
import { PageType } from '@models/page'
import { SingleResponse } from '@lib/api/strapi'

const API_KEY = process.env.API_KEY

async function revalidate(res: NextApiResponse, path: string) {
  try {
    console.log('Revalidating', path, '...')
    await res.revalidate(path)
    console.log('Revalidated', path)
  } catch (err) {
    console.log('Error revalidating', path, err)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearer = req.headers.authorization?.split('Bearer:')[1]?.trim()
  if (
    bearer &&
    API_KEY &&
    crypto.timingSafeEqual(Buffer.from(bearer), Buffer.from(API_KEY))
  ) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  try {
    const path = req.query.path
    if (path) {
      // Manual API call
      return await revalidate(res, path as string)
    } else {
      // Strapi webhook
      const model = req.body.model

      switch (model) {
        case 'content-page': {
          const category = req.body.entry.category?.slug
          const page = req.body.entry.slug
          if (!page) return res.status(400).json({ error: 'Missing slug' })
          await revalidate(res, `/${category}/${page}`)
          break
        }
        case 'category': {
          const category = req.body.entry.slug
          for (const page of req.body.entry.content_pages) {
            await revalidate(res, `/${category}/${page.slug}`)
          }
          break
        }
        case 'content-section': {
          const page = req.body.entry.content_page?.slug
          const pageData = await fetchContentPage(page)
          const category = pageData?.category?.data?.attributes?.slug
          await revalidate(res, `/${category}/${page}`)
          break
        }
        case 'file-folder': {
          const section = await fetchSection(req.body.entry.content_section?.id)

          const pageData = section?.attributes?.content_page?.data as
            | SingleResponse<PageType>
            | undefined

          const page = pageData?.attributes.slug
          const category = pageData?.attributes.category?.data?.attributes?.slug
          await revalidate(res, `/${category}/${page}`)
          break
        }
        default:
          return res.status(400).json({ error: 'Invalid model' })
      }

      return res.json({ revalidated: true })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send('Error revalidating')
  }
}
