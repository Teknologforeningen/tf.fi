import { ReactNode } from 'react'

const ErrorDialog = ({ children }: { children: ReactNode }) => (
  <dialog open className="bg-teknologröd text-white relative mt-20 mb-10 p-4 rounded-sm text-lg">
    {children}
  </dialog>
)

export default ErrorDialog
