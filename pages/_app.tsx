import '../styles/globals.css'
import '../styles/index.css'
import '../styles/slug.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
