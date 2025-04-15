import { Metadata } from 'next'
import React from 'react'
import localFont from 'next/font/local'
import { getServerSession } from 'next-auth'

import classNames from 'classnames'
import Header from '@components/header'
import getNavbar from '@lib/strapi/navbar'
import Footer from '@components/footer'
import { fetchFooter } from '@lib/strapi/footer'
import { authOptions } from '@lib/nextauth'

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
  src: [
    {
      style: 'normal',
      path: '../public/fonts/montserrat/Montserrat-VariableFont_wght.ttf',
    },
    {
      style: 'italic',
      path: '../public/fonts/montserrat/Montserrat-Italic-VariableFont_wght.ttf',
    },
  ],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Teknologföreningen',
  icons: '/favicon.ico',
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const navbarLinks = await getNavbar()
  const footer = await fetchFooter()
  const session = await getServerSession(authOptions)

  return (
    <html lang="sv">
      <body className={classNames(raleway.variable, montserrat.variable, 'h-screen font-body')}>
        <Header navbarLinks={navbarLinks} sessionToken={session?.user.token} />
        <main>{children}</main>
        <Footer nationlogos={footer?.nationlogos} />
      </body>
    </html>
  )
}

export default RootLayout
