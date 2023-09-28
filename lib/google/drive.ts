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

function createDrive(
  keys: string | undefined = process.env.GOOGLE_CREDS
): Drive | null {
  if (!keys) {
    console.error('The GOOGLE_CREDS environment variable was not found!')
    return null
  }

  const credentials = JSON.parse(keys)

  const auth = new google.auth.JWT(
    credentials.client_email,
    undefined,
    credentials.private_key,
    ['https://www.googleapis.com/auth/drive']
  )

  return new Drive(google.drive({ version: 'v3', auth }))
}

export const publicDrive = createDrive()
export const privateDrive = createDrive(process.env.GOOGLE_PRIVATE_CREDS)
