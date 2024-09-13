import React from 'react'
import { useRouter } from 'next/navigation'

interface ListCardProps {
  title: string
  path: string
  setSideMenuOpen: (state: boolean) => void
  snippet?: string
}

const ListCard = ({ title, path, setSideMenuOpen, snippet }: ListCardProps) => {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    router.push(path)
    setSideMenuOpen(false)
  }

  return (
    <div className="p-2">
      <a
        href="#"
        onClick={handleClick}
        className="text-white no-underline hover:underline cursor-pointer"
      >
        <div>{title}</div>
        {snippet && <p dangerouslySetInnerHTML={{ __html: snippet }} />}
      </a>
    </div>
  )
}

export default ListCard
