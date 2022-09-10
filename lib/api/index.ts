export const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`

type CollectionResponse<T> = {
  id: number
  attributes: Omit<T, 'id'>
}

export async function fetchFromStrapi<T>(
  path: string
): Promise<CollectionResponse<T>[]> {
  const res = await fetch(`${API_URL}${path}`)
  return res.json().then((j) => j.data)
}
