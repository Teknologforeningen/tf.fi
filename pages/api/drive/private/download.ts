import { NextApiRequest, NextApiResponse } from 'next'
import {
  getDriveInstance,
  getDriveFile,
  checkIfLoggedIn,
} from '../../../../utils/driveFiles'

const drive = getDriveInstance(process.env.GOOGLE_PRIVATE_CREDS)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //check if logged in
    const isLoggedIn = await checkIfLoggedIn(req.headers.cookie)
    if (!isLoggedIn) {
      res.status(403).json({ error: 'User not logged in' })
    }

    const { fileId, fileName } = req.query
    const stream = await getDriveFile(fileId, drive)

    res.setHeader(
      'content-disposition',
      `attachment; filename="${fileName || fileId}"`
    )
    stream.pipe(res)
  } catch (error) {
    console.error('Error downloading file', error)
    res.status(500).json({ error: 'Failed to download file' })
  }
}
