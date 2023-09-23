import { drive_v3, google } from 'googleapis'

export default class Drive {
  private drive: drive_v3.Drive

  constructor(drive: drive_v3.Drive) {
    this.drive = drive
  }

  async listFiles(folderId: string) {
    const folderStructure = await this.drive.files.list({
      q: `'${folderId}' in parents`,
      fields: 'files(id, name, mimeType, parents)',
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
      driveId: process.env.SHARED_GOOGLE_DRIVE_ID,
      corpora: 'drive',
      orderBy: 'name',
    })
    return folderStructure.data.files ?? []
  }

  async getFile(fileId: string) {
    const response = await this.drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' }
    )
    if (!response || !response.data) {
      throw new Error('File data not found!')
    }
    return response.data
  }
}

function getDriveInstance(keys: string | undefined = process.env.GOOGLE_CREDS) {
  if (!keys) {
    throw new Error(
      'The GOOGLE_DRIVE_CREDS environment variable was not found!'
    )
  }

  const credentials = JSON.parse(keys)

  const auth = new google.auth.JWT(
    credentials.client_email,
    undefined,
    credentials.private_key,
    ['https://www.googleapis.com/auth/drive']
  )

  return google.drive({ version: 'v3', auth })
}

export const publicDrive = new Drive(getDriveInstance())
export const privateDrive = new Drive(
  getDriveInstance(process.env.GOOGLE_PRIVATE_CREDS)
)
