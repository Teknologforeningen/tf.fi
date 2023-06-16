import '../styles/globals.css'
import '../styles/about-page.css'
import '../styles/links.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import localFont from 'next/font/local'

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
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default MyApp
