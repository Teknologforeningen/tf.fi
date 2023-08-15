import { NextApiRequest, NextApiResponse } from 'next'
import { getDriveInstance, getDriveFile } from '../../../../lib/api/driveFiles'
import requireAuthMiddleware from '../../../../middleware/checkAuth'

const drive = getDriveInstance(process.env.GOOGLE_PRIVATE_CREDS)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
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

export default requireAuthMiddleware(handler)