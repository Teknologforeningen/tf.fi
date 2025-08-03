import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { Pages } from './collections/pages'

export default buildConfig({
  telemetry: false,
  editor: lexicalEditor(),
  collections: [Pages],
  secret: process.env.PAYLOAD_SECRET ?? '',
  db: postgresAdapter({
    pool: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'password',
    },
  }),
  sharp,
})
