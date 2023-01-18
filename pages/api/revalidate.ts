import type { NextApiRequest, NextApiResponse } from 'next'

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
    const prefix = model === 'about-page' ? '/about/' : '/'
    if (slug == null) return res.status(400).json({ error: 'Missing slug' })

    return await revalidate(res, `${prefix}${slug}`)
  } catch (err) {
    console.log(err)
    return res.status(500).send('Error revalidating')
  }
}
