export const dynamic = 'force-dynamic'
import downloadHandler from '../../downloadHandler'
import { publicDrive } from '@lib/google/drive'

export const GET = downloadHandler(publicDrive)
