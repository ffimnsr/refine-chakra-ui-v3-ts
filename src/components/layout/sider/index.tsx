import React, { useState } from "react"
import {
  CanAccess,
  type ITreeMenu,
  useIsExistAuthentication,
  useLink,
  useLogout,
  useMenu,
  useActiveAuthProvider,
  useRefineContext,
  useRouterContext,
  useRouterType,
  useTitle,
  useTranslate,
  useWarnAboutChange,
} from "@refinedev/core"
import { Box, VStack } from "@chakra-ui/react"
import { chakra } from "@chakra-ui/react"
import {
  IconList,
  IconChevronRight,
  IconChevronLeft,
  IconDashboard,
  IconLogout,
  IconMenu2,
} from "@tabler/icons-react"

import { Title as DefaultTitle } from "@components"
import type { RefineLayoutSiderProps } from "../types"
import { Tooltip, type TooltipProps } from "@components/ui/tooltip"
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@components/ui/accordion"
import { Button } from "@components/ui/button"
import { IconButton } from "@components/ui/icon-button"
import {
  DrawerBackdrop,
  DrawerContent,
  DrawerRoot,
} from "@components/ui/drawer"
import { LuChevronDown } from "react-icons/lu"

export const Sider: React.FC<RefineLayoutSiderProps> = ({
  Title: TitleFromProps,
  render,
  meta,
}) => {
  const [collapsed, setCollapsed] = useState(false)
  const [opened, setOpened] = useState(false)

  const routerType = useRouterType()
  const NewLink = useLink()
  const { Link: LegacyLink } = useRouterContext()
  const Link = routerType === "legacy" ? LegacyLink : NewLink
  const { menuItems, selectedKey, defaultOpenKeys } = useMenu({ meta })
  const TitleFromContext = useTitle()
  const isExistAuthentication = useIsExistAuthentication()
  const t = useTranslate()
  const { hasDashboard } = useRefineContext()
  const authProvider = useActiveAuthProvider()
  const { warnWhen, setWarnWhen } = useWarnAboutChange()
  const { mutate: mutateLogout } = useLogout({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  })

  const RenderToTitle = TitleFromProps ?? TitleFromContext ?? DefaultTitle

  const siderWidth = () => {
    if (collapsed) return "80px"
    return "200px"
  }

  const commonTooltipProps: Omit<TooltipProps, "children"> = {
    placement: "right",
    hasArrow: true,
    isDisabled: !collapsed || opened,
  }

  const renderTreeView = (tree: ITreeMenu[]) => {
    return tree.map((item) => {
      const { label, route, name, icon, children } = item

      const isSelected = item.key === selectedKey
      const isParent = children.length > 0

      const linkProps = !isParent
        ? {
            as: Link,
            to: route,
          }
        : undefined

      return (
        <CanAccess
          key={item.key}
          resource={name}
          action="list"
          params={{
            resource: item,
          }}
        >
          <AccordionRoot
            defaultIndex={defaultOpenKeys.includes(item.key || "") ? 0 : -1}
            width="full"
            allowToggle
          >
            <AccordionItem value={item.key || ""} border="none">
              <Tooltip label={label} {...commonTooltipProps}>
                <AccordionItemTrigger
                  as="button"
                  pl={6}
                  pr={4}
                  pt={3}
                  pb={3}
                  width="full"
                >
                  <Link
                    width="full"
                    variant="plain"
                    color="white"
                    fontWeight="normal"
                    _active={{
                      color: "none",
                      fontWeight: isParent ? "normal" : "bold",
                    }}
                    _hover={{ textDecoration: "none" }}
                    active={isSelected}
                    {...linkProps}
                  >
                    {icon ??
                      ((
                        <>
                          <IconList size={20} />
                        </>
                      ) as any)}
                    {(!collapsed || opened) && (
                      <Box flexGrow={1} textAlign="left">
                        {label}
                      </Box>
                    )}
                    {isParent ? <LuChevronDown /> : undefined}
                  </Link>
                </AccordionItemTrigger>
              </Tooltip>

              {isParent && (
                <AccordionItemContent p={0} pl={collapsed && !opened ? 0 : 4}>
                  <AccordionRoot width="full" allowToggle>
                    {renderTreeView(children)}
                  </AccordionRoot>
                </AccordionItemContent>
              )}
            </AccordionItem>
          </AccordionRoot>
        </CanAccess>
      )
    })
  }

  const items = renderTreeView(menuItems)

  const dashboard = hasDashboard ? (
    <CanAccess resource="dashboard" action="list">
      <Tooltip
        label={t("dashboard.title", "Dashboard")}
        {...commonTooltipProps}
      >
        <Link
          width="full"
          justifyContent={collapsed && !opened ? "center" : "flex-start"}
          pl={6}
          pr={4}
          pt={3}
          pb={3}
          fontWeight="normal"
          variant="plain"
          color="white"
          active={selectedKey === "/"}
          _active={{ color: "none", fontWeight: "bold" }}
          _hover={{ textDecoration: "none" }}
          as={Link}
          href="/"
        >
          <IconDashboard size={20} />
          {(!collapsed || opened) && t("dashboard.title", "Dashboard")}
        </Link>
      </Tooltip>
    </CanAccess>
  ) : null

  const handleLogout = () => {
    if (warnWhen) {
      const confirm = window.confirm(
        t(
          "warnWhenUnsavedChanges",
          "Are you sure you want to leave? You have unsaved changes.",
        ),
      )

      if (confirm) {
        setWarnWhen(false)
        mutateLogout()
      }
    } else {
      mutateLogout()
    }
  }

  const logout = isExistAuthentication && (
    <Tooltip label={t("buttons.logout", "Logout")} {...commonTooltipProps}>
      <Button
        width="full"
        justifyContent={collapsed && !opened ? "center" : "flex-start"}
        pl={6}
        pr={4}
        pt={3}
        pb={3}
        fontWeight="normal"
        variant="plain"
        _active={{ color: "none" }}
        _hover={{ textDecoration: "none" }}
        color="white"
        onClick={handleLogout}
      >
        <IconLogout size={20} />
        {(!collapsed || opened) && t("buttons.logout", "Logout")}
      </Button>
    </Tooltip>
  )

  const renderSider = () => {
    if (render) {
      return render({
        dashboard,
        logout,
        items,
        collapsed: false,
      })
    }
    return (
      <>
        {dashboard}
        {items}
        {logout}
      </>
    )
  }

  return (
    <>
      <Box
        position="fixed"
        top={16}
        left={0}
        zIndex={1200}
        display={["block", "block", "none", "none", "none"]}
      >
        <IconButton
          borderLeftRadius={0}
          bg="sider.background"
          color="white"
          _hover={{ bg: "sider.background" }}
          _active={{
            bg: "sider.background",
            transform: "translateY(1px)",
          }}
          aria-label="Open Menu"
          onClick={() => setOpened((prev) => !prev)}
        >
          <IconMenu2 />
        </IconButton>
      </Box>
      <DrawerRoot
        placement="start"
        isOpen={opened}
        onClose={() => setOpened(false)}
      >
        <DrawerBackdrop />
        <DrawerContent w="200px" maxW="200px" bg="sider.background">
          <Box display="flex" justifyContent="center" py={4}>
            <RenderToTitle collapsed={false} />
          </Box>
          <VStack mt={2} color="white" alignItems="start" flexGrow={1}>
            <Box width="full">{renderSider()}</Box>
          </VStack>
        </DrawerContent>
      </DrawerRoot>

      <Box
        display={["none", "none", "flex"]}
        width={siderWidth()}
        transition="width 200ms ease, min-width 200ms ease"
        flexShrink={0}
      />
      <Box
        bg="sider.background"
        position="fixed"
        width={siderWidth()}
        top={0}
        h="100vh"
        display={["none", "none", "flex"]}
        flexDirection="column"
        transition="width 200ms ease, min-width 200ms ease"
      >
        <Box display="flex" justifyContent="center" py={4}>
          <RenderToTitle collapsed={collapsed} />
        </Box>
        <VStack mt={2} color="white" alignItems="start" flexGrow={1}>
          <Box width="full">{renderSider()}</Box>
        </VStack>
        <Button
          onClick={() => setCollapsed((prev) => !prev)}
          color="white"
          bg="sider.collapseButton"
          borderRadius={0}
          _hover={{ bg: "sider.collapseButton" }}
          _active={{
            bg: "sider.collapseButton",
            transform: "translateY(1px)",
          }}
        >
          {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
        </Button>
      </Box>
    </>
  )
}
