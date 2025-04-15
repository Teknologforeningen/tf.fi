import React from 'react'
import { type Donors, fetchDonors, type Group } from '@lib/barsborsen/donors'

const DonorGroup = ({ name, members }: Group) => (
  <div className="grid grid-cols-3 text-center not-prose text-lg gap-4">
    <h4 className="col-span-3 italic">{name}</h4>
    {members.map((m) => (
      <ul key={m} className="list-none m-0 p-0">
        <li className="m-0 p-0">{m}</li>
      </ul>
    ))}
  </div>
)

const DonorList = async () => {
  const donors = await fetchDonors()
  if (donors === null) return null

  const groupedDonors = groupDonors(donors)

  return (
    <section>
      <h2>Vi är med och bygger TF:s nya nationshus!</h2>
      <div className="mx-[calc(50%-40vw)] border pt-4">
        {groupedDonors.map((d) => (
          <React.Fragment key={d.members.join()}>
            <DonorGroup name={d.name} members={d.members} />
            <hr className="w-9/12 mx-auto" />
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}

function groupDonors(donors: Donors): Group[] {
  const all = [...(donors?.groups ?? []), ...(donors?.others ?? [])]
  const allSorted = all.sort((a, b) => {
    const aName = typeof a === 'string' ? a : a.name
    const bName = typeof b === 'string' ? b : b.name
    return aName < bName ? -1 : 1
  })

  const chunked: Group[] = []
  // Start with index of -1, since we start with `lastItem = group` we will never actually index with -1.
  let i = -1
  // We need to know if we should append to the list or only to the members list.
  let lastItem: 'group' | 'other' = 'group'
  for (const groupOrOther of allSorted) {
    const isGroup = typeof groupOrOther === 'object'
    if (isGroup) {
      chunked.push(groupOrOther)
      lastItem = 'group'
      i += 1
    } else {
      if (lastItem === 'group') {
        chunked.push({
          name: '',
          members: [groupOrOther],
        })
        i += 1
      } else {
        chunked[i].members.push(groupOrOther)
      }
      lastItem = 'other'
    }
  }
  return chunked
}

export default DonorList
