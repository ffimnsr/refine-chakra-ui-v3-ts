import React from "react"
import { type IconButtonProps, IconButton } from "@chakra-ui/react"
import { LuArrowLeftToLine, LuArrowRightFromLine, LuMenu } from "react-icons/lu"

import { useThemedLayoutContext } from "@hooks"

const HamburgerIcon = (props: IconButtonProps) => (
  <IconButton variant="ghost" size="sm" {...props} />
)

export const HamburgerMenu: React.FC = () => {
  const {
    siderCollapsed,
    setSiderCollapsed,
    mobileSiderOpen,
    setMobileSiderOpen,
  } = useThemedLayoutContext()

  return (
    <>
      <HamburgerIcon
        display={{ base: "none", md: "flex" }}
        aria-label="drawer-sidebar-toggle"
        onClick={() => setSiderCollapsed(!siderCollapsed)}
      >
        {siderCollapsed ? <LuArrowRightFromLine /> : <LuArrowLeftToLine />}
      </HamburgerIcon>
      <HamburgerIcon
        display={{ base: "flex", md: "none" }}
        aria-label="sidebar-toggle"
        onClick={() => setMobileSiderOpen(!mobileSiderOpen)}
      >
        <LuMenu />
      </HamburgerIcon>
    </>
  )
}
