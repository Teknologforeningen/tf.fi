import React, { Suspense } from 'react'
import FolderItem from '@components/drive/FolderItem'
import ActivityIndicator from '@components/ActivityIndicator'
import FileItem from '@components/drive/FileItem'
import { privateDrive, publicDrive } from '@lib/google/drive'

type DriveExplorerProps = {
  folderId: string
  isPrivate: boolean
}

const Loading = () => (
  <div className="mx-2 h-[25px] w-[25px] pl-4">
    <ActivityIndicator width={25} height={25} stroke="black" />
  </div>
)

const DriveExplorer = async ({ folderId, isPrivate }: DriveExplorerProps) => {
  const drive = isPrivate ? privateDrive : publicDrive

  const folderArray = await drive?.listFiles(folderId)

  return (
    <Suspense fallback={<Loading />}>
      <div className="pl-4">
        {folderArray?.map((item) =>
          item.mimeType === 'application/vnd.google-apps.folder' ? (
            item.id && (
              <FolderItem key={item.id} folder={item} isPrivate={isPrivate}>
                <DriveExplorer folderId={item.id} isPrivate={isPrivate} />
              </FolderItem>
            )
          ) : (
            <FileItem key={item.id} file={item} isPrivate={isPrivate} />
          )
        )}
      </div>
    </Suspense>
  )
}

export default DriveExplorer
