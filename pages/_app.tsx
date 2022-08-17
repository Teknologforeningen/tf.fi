import '../styles/globals.css'
import '../styles/event-page.css'
import '../styles/links.css'
import '../styles/timeline.css'
import '../styles/footer.css'
import 'overlayscrollbars/css/OverlayScrollbars.css'
import '../styles/os-theme-round-light.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Teknologföreningen</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
