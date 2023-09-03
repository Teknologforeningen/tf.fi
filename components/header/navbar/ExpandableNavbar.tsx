import MenuIcon from '@components/header/navbar/MenuIcon'
import TFLogoSmall from '@components/header/navbar/TFLogoSmall'

interface ExpandableNavbarProps {
  sideMenuOpen: boolean
  setSideMenuOpen: (state: boolean) => void
}

const ExpandableNavbar = ({
  setSideMenuOpen,
  sideMenuOpen,
}: ExpandableNavbarProps) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="mx-3 my-3 md:hidden">
        <TFLogoSmall highlight={false} />
      </div>
      <MenuIcon
        open={sideMenuOpen}
        onClick={() => setSideMenuOpen(!sideMenuOpen)}
      />
    </div>
  )
}

export default ExpandableNavbar
