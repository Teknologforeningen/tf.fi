import { useSession, signIn, signOut } from 'next-auth/react'
import classNames from 'classnames'

const LoginButton = ({ className }: { className?: string }) => {
  const { data: session } = useSession()

  return !session ? (
    <button
      onClick={(e) => {
        e.preventDefault()
        signIn('keycloak')
      }}
      className={classNames(
        'hover:bg-gray-900 rounded-lg border border-white p-3 text-white',
        className
      )}
    >
      Logga in
    </button>
  ) : (
    <button
      onClick={(e) => {
        e.preventDefault()
        signOut()
      }}
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
