import { useAuth } from '@hipsquare/react-strapi-keycloak-auth-context'
import classNames from 'classnames'

const LoginButton = ({ className }: { className?: string }) => {
  const { isAuthenticated, login, logout } = useAuth()

  return !isAuthenticated ? (
    <button
      onClick={login}
      className={classNames(
        'hover:bg-gray-900 rounded-lg border border-white p-3 text-white',
        className
      )}
    >
      Logga in
    </button>
  ) : (
    <button
      onClick={logout}
      className={classNames(
        'rounded-lg border border-teknologröd p-3 text-teknologröd',
        className
      )}
    >
      Logga ut
    </button>
  )
}

export default LoginButton
