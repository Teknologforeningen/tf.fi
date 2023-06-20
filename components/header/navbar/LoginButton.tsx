import { useAuth } from '@hipsquare/react-strapi-keycloak-auth-context'

const LoginButton = () => {
  const { isAuthenticated, login, logout } = useAuth()

  return !isAuthenticated ? (
    <button
      onClick={login}
      className="rounded-lg border border-white p-3 text-white hover:bg-gray-900"
    >
      Logga in
    </button>
  ) : (
    <button
      onClick={logout}
      className="rounded-lg border border-teknologröd p-3 text-teknologröd"
    >
      Logga ut
    </button>
  )
}

export default LoginButton