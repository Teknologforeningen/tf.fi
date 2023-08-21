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
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      session.user.token = token.jwt
      return { ...session, jwt: token.jwt, id: token.id }
    },
    async jwt({ token, user, account }) {
      if (user) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/keycloak/callback?access_token=${account?.access_token}`
        )
        const data = await response.json()
        token.jwt = data.jwt
        token.id = data.user.id
      }
      return token
    },
  },
}

const Auth = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, options)
}

export default Auth
