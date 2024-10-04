import React from 'react'
import Image from 'next/image'
import { MdOutlineFolder } from 'react-icons/md'

type FileCardProps = {
  id: string
  name: string
  thumbnailLink?: string | null
  folderPath?: string
}
const FileCard = ({ id, name, thumbnailLink, folderPath }: FileCardProps) => {
  return (
    <a
      className="flex items-center p-2 border-b border-lightGray border-opacity-50 hover:bg-lightGray hover:bg-opacity-10"
      href={`/api/drive/private/download?fileId=${id}&fileName=${name}`}
    >
      {thumbnailLink && (
        <Image
          src={thumbnailLink}
          alt={name}
          width="100"
          height="100"
          style={{ width: 130, height: 'auto', marginTop: 5, marginBottom: 5 }}
        />
      )}
      <div className="text-white ml-2">
        <div className="flex flex-row items-center opacity-80 text-sm mb-2">
          <MdOutlineFolder />
          {folderPath}
        </div>
        {name}
      </div>
    </a>
  )
}

export default FileCard
