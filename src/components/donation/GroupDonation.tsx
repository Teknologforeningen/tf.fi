'use client'

import { type Group } from '@lib/barsborsen/donors'
import TextInput from '@components/donate/form/TextInput'
import { MdEdit } from 'react-icons/md'
import CircleWrapper from '@components/donation/CircleWrapper'
import Groups from '@components/donation/Groups'
import { useState } from 'react'

const GroupDonation = ({ groups, selectGroup }: { groups: Group[]; selectGroup: (group: string) => Promise<void> }) => {
  const [newGroupName, setNewGroupName] = useState('')
  return (
    <fieldset className="border border-darkgray not-prose p-4 pb-8 grid grid-cols-[1fr_auto] gap-6 items-center">
      <legend>
        <span className="px-2 text-lg font-bold uppercase">Gruppdonation (valfri)</span>
      </legend>
      <TextInput
        name="group-name"
        placeholder="Namn på ny grupp"
        className="w-full"
        value={newGroupName}
        onChange={(e) => setNewGroupName(e.currentTarget.value)}
      />
      <button onClick={() => selectGroup(newGroupName)}>
        <CircleWrapper>
          <MdEdit className="w-6 h-6" title="Gör ny grupp" />
        </CircleWrapper>
      </button>
      <Groups groups={groups} onSelect={selectGroup} />
    </fieldset>
  )
}

export default GroupDonation
