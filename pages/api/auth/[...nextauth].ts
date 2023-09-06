import NextAuth, { NextAuthOptions } from 'next-auth'
import KeycloakProvider from 'next-auth/providers/keycloak'
import { NextApiRequest, NextApiResponse } from 'next'

const options: NextAuthOptions = {
  debug: false,
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID || 'strapi',
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || 'strapi',
      issuer: process.env.KEYCLOAK_ISSUER,
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      session.user.token = token.jwt
      return session
    },
    async jwt({ token, user, account }) {
      if (user) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/keycloak/callback?access_token=${account?.access_token}`
        )
        if (response.ok) {
          const data = await response.json()
          token.jwt = data.jwt
        }
      }
      return token
    },
  },
}

const Auth = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, options)
}

export default Auth
