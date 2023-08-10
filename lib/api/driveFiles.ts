import { drive_v3, google } from 'googleapis'

export const getDriveInstance = (keysEnvParam?: string) => {
  const keysEnvVar = keysEnvParam || process.env.GOOGLE_CREDS

  if (!keysEnvVar) {
    throw new Error(
      'The GOOGLE_DRIVE_CREDS environment variable was not found!'
    )
  }

  const credentials = JSON.parse(keysEnvVar)

  const auth = new google.auth.JWT(
    credentials.client_email,
    undefined,
    credentials.private_key,
    ['https://www.googleapis.com/auth/drive'] // Add the necessary Google Drive scopes here
  )

  return google.drive({ version: 'v3', auth })
}

export const getDriveFilesList = async (
  folderId: string | string[] | undefined,
  drive: drive_v3.Drive
) => {
  if (!folderId) {
    throw new Error('The folderId query parameter is required!')
  }
  if (Array.isArray(folderId)) {
    throw new Error('The folderId query parameter must be a string!')
  }
  const folderStructure =
    (await drive.files.list({
      q: `'${folderId}' in parents`,
      fields: 'files(id, name, mimeType, parents)',
    })) || []
  return folderStructure
}

export const getDriveFile = async (
  fileId: string | string[] | undefined,
  drive: drive_v3.Drive
) => {
  if (!fileId) {
    throw new Error('The rootFolderId query parameter is required!')
  }
  if (Array.isArray(fileId)) {
    throw new Error('The rootFolderId query parameter must be a string!')
  }

  const response = await drive.files.get(
    { fileId: fileId, alt: 'media' },
    { responseType: 'stream' }
  )
  if (!response || !response.data) {
    throw new Error('File data not found!')
  }
  return response.data
}
