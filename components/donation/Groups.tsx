'use client'

import { Group } from '@lib/barsborsen/donors'
import { Fragment, useState } from 'react'
import CircleWrapper from '@components/donation/CircleWrapper'
import { MdPersonAdd } from 'react-icons/md'

const Groups = ({ groups, onSelect }: { groups: Group[]; onSelect: (group: string) => Promise<void> }) => {
  const [showAllGroups, setShowAllGroups] = useState(false)

  const groupsToShow = showAllGroups ? groups : groups.slice(0, 3)

  return (
    <>
      {groupsToShow.map((group) => (
        <Fragment key={group.name}>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg italic">{group.name}</h3>
            <p className="text-sm font-light">{group.members.join(', ')}</p>
          </div>
          <button onClick={() => onSelect(group.name)}>
            <CircleWrapper>
              <MdPersonAdd className="w-6 h-6" title="Gå med i grupp" />
            </CircleWrapper>
          </button>
          <hr className="col-span-2 w-11/12 justify-self-center" />
        </Fragment>
      ))}
      {!showAllGroups && (
        <button className="link w-fit mx-auto" onClick={() => setShowAllGroups(true)}>
          Visa alla grupper
        </button>
      )}
    </>
  )
}

export default Groups
