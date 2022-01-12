export async function fetchMultiple<T>(path: string): Promise<T[]> {
  const res = await fetch(`${process.env.BACKEND_URL}${path}`)
  return res.json()
}
