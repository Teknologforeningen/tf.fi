'use client'

import { signIn, signOut, getSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

const LoginButton = ({ className }: { className?: string }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    getSession().then((session) => setIsLoggedIn(session !== null))
  }, [])

  return !isLoggedIn ? (
    <button
      onClick={(e) => {
        e.preventDefault()
        signIn('keycloak')
      }}
      className={classNames(
        'mx-3 rounded-lg border border-white p-2 text-white hover:border-slate-300 hover:text-slate-300 lg:min-w-max',
        className
      )}
    >
      Logga in
    </button>
  ) : (
    <button
      onClick={(e) => {
        e.preventDefault()
        signOut({ callbackUrl: '/' })
      }}
      className={classNames(
        'mx-3 rounded-lg border border-teknologröd p-2 text-teknologröd hover:border-red-800 hover:text-red-800 lg:min-w-max',
        className
      )}
    >
      Logga ut
    </button>
  )
}

export default LoginButton
