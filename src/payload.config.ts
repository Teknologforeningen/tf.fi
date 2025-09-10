import { Media } from '@cms/collections/media'
import { Donate } from '@cms/globals/donate'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { migrations } from './migrations'

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
        database: process.env.DATABASE_NAME ?? 'postgres',
        user: process.env.DATABASE_USER ?? 'postgres',
        password: process.env.DATABASE_PASSWORD ?? 'postgres',
      },
      prodMigrations: migrations,
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
