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

type DriveExplorerProps = {
  folderId: string
}

const DriveExplorer = ({ folderId }: DriveExplorerProps) => {
  const [folderArray, setFolderArray] = useState<(Folder | File)[]>([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFolder = async () => {
      const res = await fetch(
        publicDownloadUrl + `listFiles?folderId=${folderId}`
      )
      const data = await res.json()
      if (data.error) {
        console.error(data.error)
        return
      }
      setFolderArray(data.data.files)
      setLoading(false)
    }

    fetchFolder()
  }, [folderId])
  return (
    <div className="pl-4">
      {isLoading ? (
        <div className="mx-2 h-[25px] w-[25px] pl-4">
          <ActivityIndicator width={25} height={25} stroke="black" />
        </div>
      ) : (
        folderArray.map((item) =>
          item.mimeType === 'application/vnd.google-apps.folder' ? (
            <FolderItem key={item.id} folder={item as Folder} />
          ) : (
            <FileItem key={item.id} file={item as File} />
          )
        )
      )}
    </div>
  )
}

const FileItem = ({ file }: { file: File }) => {
  const downloadFile = () => {
    window.location.href =
      publicDownloadUrl + `download?fileId=${file.id}&fileName=${file.name}`
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

const FolderItem = ({ folder }: { folder: Folder }) => {
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
      {isExpanded && <DriveExplorer folderId={folder.id} />}
    </ItemWrapper>
  )
}

const ItemWrapper = ({ children }: React.PropsWithChildren) => (
  <div className="p-[4px] pl-4">{children}</div>
)

export default DriveExplorer
