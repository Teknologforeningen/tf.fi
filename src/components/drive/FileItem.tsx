import { drive_v3 } from 'googleapis'
import ItemWrapper from '@components/drive/ItemWrapper'
import { MdFileDownload } from 'react-icons/md'
import React from 'react'
import Link from 'next/link'

const publicDownloadUrl = '/api/drive/public/download'
const privateDownloadUrl = '/api/drive/private/download'

const DownloadLink = ({ fileName, href }: { fileName: string; href: string }) => (
  <Link
    href={href}
    target="_blank"
    download
    className="flex flex-row items-center tracking-wide no-underline hover:text-teknologröd"
  >
    <MdFileDownload className="mx-1" />
    {fileName}
  </Link>
)

const FileItem = ({ file, isPrivate }: { file: drive_v3.Schema$File; isPrivate: boolean }) => {
  const downloadUrl = `${isPrivate ? privateDownloadUrl : publicDownloadUrl}?fileId=${file.id}&fileName=${file.name}`

  return (
    <ItemWrapper>
      {isPrivate ? (
        <DownloadLink fileName={file.name ?? ''} href={downloadUrl} />
      ) : (
        <DownloadLink fileName={file.name ?? ''} href={`https://drive.google.com/file/d/${file.id}/view`} />
      )}
    </ItemWrapper>
  )
}

export default FileItem
