import { NextAuthOptions } from 'next-auth'
import KeycloakProvider from 'next-auth/providers/keycloak'
import { API_URL } from '@lib/strapi'

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID ?? 'strapi',
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET ?? 'strapi',
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
          `${API_URL}/auth/keycloak/callback?access_token=${account?.access_token}`
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
