import downloadHandler from '../../downloadHandler'
import { privateDrive } from '@lib/google/drive'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

const handler = downloadHandler(privateDrive)

export async function GET(request: NextRequest) {
  const session = await getServerSession()
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
  }

  return handler(request)
}
