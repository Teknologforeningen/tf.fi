'use client'

import { useRouter } from 'next/navigation'

type HeaderLinkProps = {
  title: string
  href: string
  setSideMenuOpen: (state: boolean) => void
  className?: string
}

/* Prefetch on hover cannot be disabled for NextJS links that point to pages with static props
   (might be possible with app router), requiring this custom Link component. */
const HeaderLink = ({ title, href, setSideMenuOpen, className }: HeaderLinkProps) => {
  const router = useRouter()

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setSideMenuOpen(false)
    router.push(href)
  }

  return (
    <a href={href} onClick={onClick} className={className}>
      {title}
    </a>
  )
}

export default HeaderLink
