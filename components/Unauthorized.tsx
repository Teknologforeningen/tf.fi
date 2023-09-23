'use client'

import { signIn } from 'next-auth/react'

const Unauthorized = () => (
  <>
    <p>Denna sida kräver inloggning</p>
    <button
      onClick={() => signIn('keycloak')}
      className="mx-3 rounded-lg border p-2 hover:font-bold"
    >
      Logga in
    </button>
  </>
)

export default Unauthorized
