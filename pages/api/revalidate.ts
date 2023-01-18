import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Converts a model and string combination to a path.
 * The model id can be converted to a prefix by looking at this projects directory layout.
 * @param model API ID for model. Found in Strapi.
 * @param slug The slug for a path. Found in Strapi.
 */
function getPath(model: string, slug: string): string {
  switch (model) {
    case 'about-page':
      return `/about/${slug}`
    case 'abi-page':
      return `/abi/${slug}`
    default:
      throw new Error(`Model not found: ${model}`)
  }
}

async function revalidate(res: NextApiResponse, path: string) {
  console.log('Revalidating', path, '...')
  await res.revalidate(path)
  console.log('Revalidation complete for', path)
  res.json({ revalidated: true })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearer = req.headers.authorization?.slice(7)
  if (bearer !== process.env.API_KEY)
    return res.status(401).json({ error: 'Invalid token' })

  try {
    const path = req.query.path
    if (path != null) return await revalidate(res, path as string)

    const model = req.body.model
    const slug = req.body.entry.slug
    if (slug == null) return res.status(400).json({ error: 'Missing slug' })

    return await revalidate(res, getPath(model, slug))
  } catch (err) {
    console.log(err)
    return res.status(500).send('Error revalidating')
  }
}
