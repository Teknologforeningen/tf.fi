import { HomePage } from '../../pages'

export async function fetchHomepage(): Promise<HomePage> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/homepage`)
  return res.json()
}
