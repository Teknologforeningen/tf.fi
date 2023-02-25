export const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`

export type Locale = 'sv-FI' | 'fi-FI' | 'en-GB'

export type CollectionResponse<T> = {
  id: number
  attributes: Omit<T, 'id'>
}

export async function fetchFromStrapi<T>(
  path: string,
  url: string = API_URL // For testing
): Promise<CollectionResponse<T>[]> {
  const res = await fetch(`${url}${path}`)
  const json = await res.json()
  const data = json.data
  if (!(data instanceof Array)) throw new Error('Expeceted array')
  return data
}
