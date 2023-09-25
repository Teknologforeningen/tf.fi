'use client'

import React, { useState } from 'react'
import ItemWrapper from '@components/drive/ItemWrapper'
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdOutlineFolder,
} from 'react-icons/md'
import { drive_v3 } from 'googleapis'

const FolderItem = ({
  folder,
  children,
}: {
  folder: drive_v3.Schema$File
  isPrivate: boolean
  children: React.ReactNode
}) => {
  const [isExpanded, setExpanded] = useState(false)

  return (
    <ItemWrapper>
      <button
        onClick={() => setExpanded(!isExpanded)}
        className="flex flex-row items-center tracking-wide hover:text-teknologröd
        "
      >
        {isExpanded ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
        <div className="mx-1">
          <MdOutlineFolder />
        </div>
        {folder.name}
      </button>
      {isExpanded && children}
    </ItemWrapper>
  )
}

export default FolderItem
