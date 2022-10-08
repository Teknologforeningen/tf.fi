export const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`

export type CollectionResponse<T> = {
  id: number
  attributes: Omit<T, 'id'>
}

export async function fetchFromStrapi<T>(
  path: string,
  url: string = API_URL // For testing
): Promise<CollectionResponse<T> | CollectionResponse<T>[]> {
  const res = await fetch(`${url}${path}`)
  return res.json().then((j) => j.data)
}
