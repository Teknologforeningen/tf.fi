import { useState, useEffect } from 'react'
import { Folder, File } from '../models/files'

type DriveExplorerProps = {
  folderId: string
}

const FileItem: React.FC<{ file: File }> = ({ file }) => {
  const downloadFile = () => {
    window.location.href = `/api/drive/download?fileId=${file.id}`
  }

  return (
    <div className="pl-4">
      <button
        onClick={downloadFile}
        className="cursor-pointer text-blue-500 underline"
      >
        {file.name}
      </button>
    </div>
  )
}

const FolderItem: React.FC<{ folder: Folder }> = ({ folder }) => {
  const [isExpanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!isExpanded)
  }

  return (
    <div className="pl-4">
      <button
        onClick={toggleExpanded}
        className="cursor-pointer text-blue-500 underline"
      >
        {isExpanded ? '-' : '+'} {folder.name}
      </button>
      {isExpanded && <DriveExplorer folderId={folder.id} />}
    </div>
  )
}

const DriveExplorer: React.FC<DriveExplorerProps> = ({ folderId }) => {
  const [folderArray, setFolderArray] = useState<(Folder | File)[]>([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFolder = async () => {
      const res = await fetch(`/api/drive/listFiles?folderId=${folderId}`)
      const data = await res.json()
      if (data.error) {
        console.error(data.error)
        return
      }
      setFolderArray(data)
      setLoading(false)
    }

    fetchFolder()
  }, [folderId])

  return (
    <div className="pl-4">
      {isLoading ? (
        <p>Loading...</p>
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

export default DriveExplorer
