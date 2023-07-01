import { google } from 'googleapis'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { fileId } = req.query
    if (!fileId) {
      throw new Error('The rootFolderId query parameter is required!')
    }
    if (Array.isArray(fileId)) {
      throw new Error('The rootFolderId query parameter must be a string!')
    }
    const keysEnvVar = process.env.GOOGLE_CREDS

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

    const drive = google.drive({ version: 'v3', auth })
    const response = await drive.files.get(
      { fileId: fileId, alt: 'media' },
      { responseType: 'stream' }
    )
    if (!response || !response.data) {
      throw new Error('File data not found!')
    }
    const stream = response.data

    res.setHeader(
      'content-disposition',
      `attachment; filename="${'donwload.pdf'}"`
    )
    stream.pipe(res)
  } catch (error) {
    console.error('Error downloading file', error)
    res.status(500).json({ error: 'Failed to download file' })
  }
}
