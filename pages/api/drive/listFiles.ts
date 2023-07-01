import { google } from 'googleapis'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { folderId } = req.query
    if (!folderId) {
      throw new Error('The folderId query parameter is required!')
    }
    if (Array.isArray(folderId)) {
      throw new Error('The folderId query parameter must be a string!')
    }
    const folderStructure = await getFolders(folderId)
    res.status(200).json(folderStructure)
  } catch (error) {
    console.error('Error retrieving folder structure:', error)
    res.status(500).json({ error: 'Failed to retrieve folder structure' })
  }
}

export const getFolders = async (folderId: string) => {
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

  const filesResponse = await drive.files.list({
    q: `'${folderId}' in parents`,
    fields: 'files(id, name, mimeType, parents)',
  })

  return filesResponse.data.files || []
}
