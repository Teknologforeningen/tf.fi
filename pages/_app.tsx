import '../styles/globals.css'
import '../styles/links.css'
import '../styles/calendar.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import localFont from 'next/font/local'

import { WithAuthContext } from '@hipsquare/react-strapi-keycloak-auth-context'

const raleway = localFont({
  src: [
    {
      style: 'normal',
      weight: '400',
      path: '../public/fonts/raleway/Raleway-VariableFont_wght.woff2',
    },
    {
      style: 'italic',
      weight: '400',
      path: '../public/fonts/raleway/Raleway-Italic-VariableFont_wght.woff2',
    },
  ],
  variable: '--font-raleway',
})

const montserrat = localFont({
  src: '../public/fonts/montserrat/Montserrat-Bold.woff2',
  variable: '--font-montserrat',
})

export const STRAPI_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? 'https://cms.tf.fi'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Teknologföreningen</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <main
        className={`${raleway.variable} ${montserrat.variable} h-full font-body`}
      >
        <WithAuthContext
          strapiBaseUrl={STRAPI_URL}
          redirectToUrlAfterLogin="http://localhost:3000"
        >
          <Component {...pageProps} />
        </WithAuthContext>
      </main>
    </>
  )
}

export default MyApp
