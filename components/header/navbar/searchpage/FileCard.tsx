import React from 'react'
import Image from 'next/image'

type FileCardProps = {
  id: string
  name: string
  thumbnailLink?: string | null
}
const FileCard = ({ id, name, thumbnailLink }: FileCardProps) => {
  return (
    <a
      className="flex items-center p-2 border-b border-lightGray border-opacity-50 hover:bg-lightGray hover:bg-opacity-10 w-full"
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
      <p className="text-white ml-2">{name}</p>
    </a>
  )
}

export default FileCard
