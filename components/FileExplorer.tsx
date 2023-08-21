import React, { useState, useEffect } from 'react'
import { Folder, File } from '@models/files'
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdOutlineFolder,
  MdFileDownload,
} from 'react-icons/md'
import ActivityIndicator from './ActivityIndicator'

const publicDownloadUrl = '/api/drive/public/'
const privateDownloadUrl = '/api/drive/private/'

type DriveExplorerProps = {
  folderId: string
  isPrivate: boolean
}

const DriveExplorer = ({ folderId, isPrivate }: DriveExplorerProps) => {
  const [folderArray, setFolderArray] = useState<(Folder | File)[]>([])
  const [isLoading, setLoading] = useState(true)

  const downloadUrl = isPrivate ? privateDownloadUrl : publicDownloadUrl

  useEffect(() => {
    const fetchFolder = async () => {
      const res = await fetch(downloadUrl + `listFiles?folderId=${folderId}`)
      const data = await res.json()
      if (data.error) {
        console.error(data.error)
        return
      }
      setFolderArray(data.data.files)
      setLoading(false)
    }

    fetchFolder()
  }, [folderId, downloadUrl])
  return (
    <div className="pl-4">
      {isLoading ? (
        <div className="mx-2 h-[25px] w-[25px] pl-4">
          <ActivityIndicator width={25} height={25} stroke="black" />
        </div>
      ) : (
        folderArray.map((item) =>
          item.mimeType === 'application/vnd.google-apps.folder' ? (
            <FolderItem
              key={item.id}
              folder={item as Folder}
              isPrivate={isPrivate}
            />
          ) : (
            <FileItem
              key={item.id}
              file={item as File}
              downloadUrl={downloadUrl}
            />
          )
        )
      )}
    </div>
  )
}

const FileItem = ({
  file,
  downloadUrl,
}: {
  file: File
  downloadUrl: string
}) => {
  const downloadFile = () => {
    window.location.href =
      downloadUrl + `download?fileId=${file.id}&fileName=${file.name}`
  }

  return (
    <ItemWrapper>
      <button
        onClick={downloadFile}
        className="flex flex-row items-center tracking-wide hover:font-semibold"
      >
        <div className="mx-1">
          <MdFileDownload />
        </div>
        {file.name}
      </button>
    </ItemWrapper>
  )
}

const FolderItem = ({
  folder,
  isPrivate,
}: {
  folder: Folder
  isPrivate: boolean
}) => {
  const [isExpanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!isExpanded)
  }

  return (
    <ItemWrapper>
      <button
        onClick={toggleExpanded}
        className="flex flex-row items-center tracking-wide hover:font-semibold
        "
      >
        {isExpanded ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
        <div className="mx-1">
          <MdOutlineFolder />
        </div>
        {folder.name}
      </button>
      {isExpanded && (
        <DriveExplorer folderId={folder.id} isPrivate={isPrivate} />
      )}
    </ItemWrapper>
  )
}

const ItemWrapper = ({ children }: React.PropsWithChildren) => (
  <div className="p-[4px] pl-4">{children}</div>
)

export default DriveExplorer
