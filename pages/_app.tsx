import '../styles/globals.css'
import '../styles/index.css'
import '../styles/event-page.css'
import '../styles/navbar.css'
import '../styles/info.css'
import '../styles/event-box.css'
import '../styles/fundraising.css'
import '../styles/links.css'
import '../styles/timeline.css'
import '../styles/footer.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Teknologföreningen</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
