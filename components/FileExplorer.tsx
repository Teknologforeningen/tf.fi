import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Folder, File } from '../models/files'
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdOutlineFolder,
  MdFileDownload,
} from 'react-icons/md'

type DriveExplorerProps = {
  folderId: string
}

const publicDownloadUrl = '/api/drive/public/'

const FileItem: React.FC<{ file: File }> = ({ file }) => {
  const downloadFile = () => {
    window.location.href =
      publicDownloadUrl + `download?fileId=${file.id}&fileName=${file.name}`
  }

  return (
    <ItemWrapper>
      <button
        onClick={downloadFile}
        className="flex flex-row items-center tracking-wide hover:text-[15px]  hover:font-semibold"
      >
        <div className="mx-1">
          <MdFileDownload />
        </div>
        {file.name}
      </button>
    </ItemWrapper>
  )
}

const FolderItem: React.FC<{ folder: Folder }> = ({ folder }) => {
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

const DriveExplorer: React.FC<DriveExplorerProps> = ({ folderId }) => {
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
  console.log(folderArray)
  return (
    <div className="pl-4 ">
      {isLoading ? (
        <Image src="/loading.svg" alt="loading" width={25} height={25} />
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

const ItemWrapper = ({ children }: React.PropsWithChildren) => (
  <div className=" p-[4px] pl-4">{children}</div>
)

export default DriveExplorer
