import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearer = req.headers.authorization?.slice(7)
  if (bearer !== process.env.API_KEY) {
    res.status(401).json({ error: 'Invalid token' })
  }

  try {
    const model = req.body.model
    const slug = req.body.entry.slug
    const prefix = model === 'about-page' ? '/about/' : '/'
    if (slug == null) res.status(400).json({ error: 'Missing slug' })

    await res.revalidate(`${prefix}${slug}`)
    console.log(`Revalidated ${prefix}${slug}`)
    res.json({ revalidated: true })
  } catch (err) {
    console.log(err)
    return res.status(500).send('Error revalidating')
  }
}
