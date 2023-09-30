import { Metadata } from 'next'
import React from 'react'
import { getServerSession } from 'next-auth'
import localFont from 'next/font/local'

import classNames from 'classnames'
import SessionProvider from '@components/SessionProvider'
import Header from '@components/header'
import getNavbar from '@lib/strapi/navbar'
import Footer from '@components/footer'
import { fetchFooter } from '@lib/strapi/footer'

import '@styles/globals.css'
import '@styles/links.css'
import '@styles/calendar.css'

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

export const metadata: Metadata = {
  title: 'Teknologföreningen',
  icons: '/favicon.ico',
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession()
  const navbarLinks = await getNavbar()
  const footer = await fetchFooter()

  return (
    <html lang="sv">
      <body
        className={classNames(
          raleway.variable,
          montserrat.variable,
          'h-screen font-body'
        )}
      >
        <SessionProvider session={session}>
          <Header navbarLinks={navbarLinks} />
          <main>{children}</main>
        </SessionProvider>
        <Footer nationlogos={footer?.nationlogos} />
      </body>
    </html>
  )
}

export default RootLayout
