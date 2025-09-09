import { drive_v3, google } from 'googleapis'
import { GaxiosResponse } from 'gaxios'
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
    const response = await this.drive.files.get({ fileId, alt: 'media' }, { responseType: 'stream' })
    if (!response || !response.data) {
      throw new Error('File data not found!')
    }
    return response.data
  }

  //note duplicates can occur, seems to be if query is present in name and fullText (content)
  async searchFiles(searchParam: string, pageToken?: string, pageSize = 10) {
    const searchResults = await this.drive.files.list({
      q: `(name contains '${searchParam}' or fullText contains '${searchParam}') and mimeType != 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'nextPageToken, files(id, name, thumbnailLink, parents)',
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
      driveId: process.env.SHARED_GOOGLE_DRIVE_ID,
      corpora: 'drive',
      pageToken: pageToken,
      pageSize: pageSize,
    })
    return searchResults.data ?? { files: [] }
  }

  //search all folders from shared drive
  async getAllDirectories(): Promise<{ files: drive_v3.Schema$File[] }> {
    const allFiles: drive_v3.Schema$File[] = []
    let pageToken: string | undefined = undefined
    try {
      do {
        const response: GaxiosResponse<drive_v3.Schema$FileList> = await this.drive.files.list({
          q: `mimeType = 'application/vnd.google-apps.folder' and trashed = false and name != 'Public' and name != 'Private'`,
          fields: 'nextPageToken, files(id, name, parents)',
          supportsAllDrives: true,
          includeItemsFromAllDrives: true,
          driveId: process.env.SHARED_GOOGLE_DRIVE_ID,
          corpora: 'drive',
          pageSize: 1000,
          pageToken: pageToken,
        })
        const searchResults = response.data

        allFiles.push(...(searchResults.files || []))
        pageToken = searchResults.nextPageToken || undefined
      } while (pageToken)

      return { files: allFiles }
    } catch (error) {
      console.error('Error fetching directories:', error)
      throw error
    }
  }
}

function createDrive(keys: string | undefined = process.env.GOOGLE_CREDS): Drive | null {
  if (!keys) {
    console.error('The GOOGLE_CREDS environment variable was not found!')
    return null
  }

  const credentials = JSON.parse(keys)

  const auth = new google.auth.JWT(credentials.client_email, undefined, credentials.private_key, [
    'https://www.googleapis.com/auth/drive',
  ])
  return new Drive(google.drive({ version: 'v3', auth }))
}

export const publicDrive = createDrive()
export const privateDrive = createDrive(process.env.GOOGLE_PRIVATE_CREDS)
