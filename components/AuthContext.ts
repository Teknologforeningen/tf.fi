import dynamic from 'next/dynamic'

export const AuthContext = dynamic(
  () =>
    import('@hipsquare/react-strapi-keycloak-auth-context').then(
      (mod) => mod.WithAuthContext
    ),
  { ssr: false }
)
