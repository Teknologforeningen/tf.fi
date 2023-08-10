import { NextApiRequest, NextApiResponse } from 'next'
import {
  getDriveFilesList,
  getDriveInstance,
} from '../../../../lib/api/driveFiles'

const drive = getDriveInstance()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { folderId } = req.query
    const folderStructure = await getDriveFilesList(folderId, drive)
    res.status(200).json(folderStructure)
  } catch (error) {
    console.error('Error retrieving folder structure:', error)
    res.status(500).json({ error: 'Failed to retrieve folder structure' })
  }
}

export default handler
