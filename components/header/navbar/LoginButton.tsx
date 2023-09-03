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
        'hover:bg-gray-900 mx-3 rounded-lg border border-white p-2 text-white hover:font-bold',
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
        'mx-3 rounded-lg border border-teknologröd p-2 text-teknologröd hover:font-bold',
        className
      )}
    >
      Logga ut
    </button>
  )
}

export default LoginButton
