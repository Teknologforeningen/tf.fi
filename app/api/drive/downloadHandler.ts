import contentDisposition from 'content-disposition'
import Drive from '@lib/google/drive'
import { NextRequest, NextResponse } from 'next/server'
import { Readable } from 'stream'

export default function downloadHandler(drive: Drive) {
  return async (request: NextRequest) => {
    try {
      const params = request.nextUrl.searchParams
      const fileId = params.get('fileId')
      const fileName = params.get('fileName')

      if (!fileId) {
        return NextResponse.json(
          { error: 'query param missing: fileId' },
          { status: 400 }
        )
      }

      const stream = await drive.getFile(fileId)
      return new Response(Readable.toWeb(stream) as ReadableStream, {
        headers: {
          'Content-Disposition': contentDisposition(fileName || fileId),
        },
      })
    } catch (error) {
      console.error('Error downloading file', error)
      return NextResponse.json(
        { error: 'Failed to download file' },
        { status: 500 }
      )
    }
  }
}
