import { NextApiRequest, NextApiResponse } from 'next'
import { getDriveInstance, getDriveFile } from '@lib/api/driveFiles'
import contentDisposition from 'content-disposition'

const drive = getDriveInstance()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let { fileId, fileName } = req.query
    if (fileId instanceof Array) fileId = fileId[0]
    if (fileName instanceof Array) fileName = fileName[0]
    const stream = await getDriveFile(fileId, drive)

    res.setHeader('content-disposition', contentDisposition(fileName || fileId))
    stream.pipe(res)
  } catch (error) {
    console.error('Error downloading file', error)
    res.status(500).json({ error: 'Failed to download file' })
  }
}

export default handler
