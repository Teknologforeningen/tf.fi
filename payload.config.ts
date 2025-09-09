import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { Donate } from './src/cms/globals/donate'
import { Media } from './src/cms/collections/media'

// Hacky solution to avoid having a PostgreSQL connection while building. We could also consider simply using SQLite in
// production. The reason for using PostgreSQL is that we have a server ready so why not use it.
const isBuilding = process.env.NEXT_PHASE === 'phase-production-build'
const db = isBuilding
  ? sqliteAdapter({
      client: {
        url: 'file:build.db',
      },
    })
  : postgresAdapter({
      pool: {
        host: process.env.DATABASE_URL ?? 'localhost',
        port: parseInt(process.env.DATABASE_PORT ?? '5432'),
        user: process.env.DATABASE_USER ?? 'postgres',
        password: process.env.DATABASE_PASSWORD ?? 'postgres',
      },
    })

export default buildConfig({
  telemetry: false,
  editor: lexicalEditor(),
  collections: [Media],
  globals: [Donate],
  secret: process.env.PAYLOAD_SECRET ?? '',
  db,
  sharp,
})
