# tf.fi

Teknologföreningen's homepage. Built with Next.js and Strapi.

## Development

1. Install [Node.js](https://nodejs.org/en) (v18)
2. Install [yarn](https://yarnpkg.com/) (tip: run `corepack enable`)
3. Install dependencies `yarn install`
4. Set environmental variables in `.env.local`
5. Run development server `yarn dev`

## Google environment variables

For calendar and file handling we use the google api. These requests are fetched with 2 [google service accounts](https://cloud.google.com/iam/docs/service-account-overview), one private defined by GOOGLE_PRIVATE_CREDS (for private file handling) and one public GOOGLE_CREDS (public file handling and calendar). These are currently managed by Teknologföreningen google workspace admin. New service account can be created like [this](https://cloud.google.com/iam/docs/service-accounts-create), the service account environment variables are [google service account keys](https://cloud.google.com/iam/docs/keys-create-delete#creating). Google drive and calendar api read permissions need to be given to the service accounts for the features to work properly.

### Calendar

The calendar events are directly fetched from a public google calendar by [Google calendar api](https://developers.google.com/calendar/api/quickstart/nodejs) (calendar defined by NEXT_PUBLIC_GOOGLE_CALENDAR_ID in .env file). Implementation in [/lib/google/calendar.ts](https://github.com/Teknologforeningen/tf.fi/blob/master/lib/google/calendar.ts).

### File handling

The file handling is separated into public and private (needing auth) files, implementaiton in [app/api/drive](https://github.com/Teknologforeningen/tf.fi/tree/master/app/api/drive). These use the [google drive api](https://developers.google.com/drive/api/guides/about-sdk). The files are fetched from a specific google workspace for which SHARED_GOOGLE_DRIVE_ID needs to be defined to search files from the workspace.
