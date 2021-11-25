import '../styles/globals.css'
import '../styles/index.css'
import '../styles/event-page.css'
import '../styles/navbar.css'
import '../styles/info.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
