export async function fetchMultiple<T>(path: string): Promise<T[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`)
  return res.json()
}
