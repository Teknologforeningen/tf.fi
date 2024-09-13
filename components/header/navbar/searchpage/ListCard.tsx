import React from 'react'
import { useRouter } from 'next/navigation'
import { truncateString } from '@utils/helpers'

interface ListCardProps {
  title: string
  path: string
  setSideMenuOpen: (state: boolean) => void
  onClick: () => void
  content?: string
}

const ListCard = ({
  title,
  path,
  setSideMenuOpen,
  onClick,
  content,
}: ListCardProps) => {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    router.push(path)
    onClick()
    setSideMenuOpen(false)
  }

  return (
    <div className="p-4 bg-lightGray rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-4 max-h-36 overflow-hidden">
      <a
        href="#"
        onClick={handleClick}
        className="text-black no-underline hover:underline cursor-pointer"
      >
        <div className="font-semibold text-lg mb-2 text-ellipsis overflow-hidden whitespace-nowrap">
          {title}
        </div>
        {content && truncateString(content, 500)}
      </a>
    </div>
  )
}

export default ListCard
