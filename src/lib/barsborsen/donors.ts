import { barsborsenUrl } from '@lib/barsborsen/index'

export interface Group {
  name: string
  members: string[]
}

export interface Donors {
  groups: Group[]
  others: string[]
}

export async function fetchDonors(): Promise<Donors | null> {
  if (barsborsenUrl === undefined) return null

  return fetch(`${barsborsenUrl}/donations/groups`).then((r) => r.json())
}
