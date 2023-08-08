import { NextApiRequest, NextApiResponse } from 'next'
import {
  getDriveFilesList,
  getDriveInstance,
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

    const { folderId } = req.query
    const folderStructure = await getDriveFilesList(folderId, drive)
    res.status(200).json(folderStructure)
  } catch (error) {
    console.error('Error retrieving folder structure:', error)
    res.status(500).json({ error: 'Failed to retrieve folder structure' })
  }
}
