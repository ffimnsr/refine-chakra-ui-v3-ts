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
import { Box, VStack, useDrawer, useAccordion, Accordion } from "@chakra-ui/react"
import {
  LuList,
  LuChevronRight,
  LuChevronLeft,
  LuGauge,
  LuLogOut,
  LuMenu,
} from "react-icons/lu"

import { Title as DefaultTitle } from "@components"
import type { RefineLayoutSiderProps } from "../types"
import { Button } from "@components/ui/button"
import {
  AccordionItem,
  AccordionItemContent,
  AccordionRoot,
  AccordionRootProvider,
} from "@components/ui/accordion"
import { IconButton } from "@components/ui/icon-button"
import {
  DrawerBackdrop,
  DrawerContent,
  DrawerRootProvider,
} from "@components/ui/drawer"
import { LuChevronDown } from "react-icons/lu"
import { Tooltip, type TooltipProps } from "@components/ui/tooltip"

export const Sider: React.FC<RefineLayoutSiderProps> = ({
  Title: TitleFromProps,
  render,
  meta,
}) => {
  const [collapsed, setCollapsed] = useState(false)
  const drawer = useDrawer({})

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

  const accordion = useAccordion({
    defaultValue: defaultOpenKeys,
  })

  const RenderToTitle = TitleFromProps ?? TitleFromContext ?? DefaultTitle

  const siderWidth = () => {
    if (collapsed) return "80px"
    return "200px"
  }

  const commonTooltipProps: Omit<TooltipProps, "children" | "content"> = {
    positioning: {
      placement: "right",
    },
    showArrow: true,
    disabled: !collapsed || drawer.open,
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
          <AccordionRootProvider value={accordion} w="full">
            <AccordionItem value={item.key || ""}>
              <Tooltip content={label} {...commonTooltipProps}>
                <Accordion.ItemTrigger px={4} py={3} w="full">
                  <Button
                    width="full"
                    variant="plain"
                    color="white"
                    fontWeight="normal"
                    data-active={isSelected}
                    _active={{
                      color: "none",
                      fontWeight: isParent ? "normal" : "bold",
                    }}
                    _hover={{ textDecoration: "none" }}
                    {...linkProps}
                  >
                    {icon ??
                      ((
                        <>
                          <LuList size={20} />
                        </>
                      ) as any)}
                    {(!collapsed || drawer.open) && (
                      <Box flexGrow={1} textAlign="left">
                        {label}
                      </Box>
                    )}
                    {isParent ? <LuChevronDown /> : undefined}
                  </Button>
                </Accordion.ItemTrigger>
              </Tooltip>

              {isParent && (
                <AccordionItemContent
                  p={0}
                  pl={collapsed && !drawer.open ? 0 : 4}
                >
                  <AccordionRoot w="full" collapsible>
                    {renderTreeView(children)}
                  </AccordionRoot>
                </AccordionItemContent>
              )}
            </AccordionItem>
          </AccordionRootProvider>
        </CanAccess>
      )
    })
  }

  const items = renderTreeView(menuItems)

  const dashboard = hasDashboard ? (
    <CanAccess resource="dashboard" action="list">
      <Tooltip
        content={t("dashboard.title", "Dashboard")}
        {...commonTooltipProps}
      >
        <Button
          width="full"
          justifyContent={collapsed && !drawer.open ? "center" : "flex-start"}
          pl={6}
          pr={4}
          pt={3}
          pb={3}
          fontWeight="normal"
          variant="plain"
          color="white"
          data-active={selectedKey === "/"}
          _active={{ color: "none", fontWeight: "bold" }}
          _hover={{ textDecoration: "none" }}
        >
          <LuGauge size={20} />
          {(!collapsed || drawer.open) && t("dashboard.title", "Dashboard")}
        </Button>
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
    <Tooltip content={t("buttons.logout", "Logout")} {...commonTooltipProps}>
      <Button
        width="full"
        justifyContent={collapsed && !drawer.open ? "center" : "flex-start"}
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
        <LuLogOut size={20} />
        {(!collapsed || drawer.open) && t("buttons.logout", "Logout")}
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
          onClick={() => drawer.setOpen(!drawer.open)}
        >
          <LuMenu />
        </IconButton>
      </Box>
      <DrawerRootProvider value={drawer}>
        <DrawerBackdrop />
        <DrawerContent
          w="200px"
          maxW="200px"
          bgColor="bg.subtle"
        >
          <Box display="flex" justifyContent="center" py={4}>
            <RenderToTitle collapsed={false} />
          </Box>
          <VStack mt={2} color="white" alignItems="start" flexGrow={1}>
            <Box width="full">{renderSider()}</Box>
          </VStack>
        </DrawerContent>
      </DrawerRootProvider>

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
          {collapsed ? <LuChevronRight /> : <LuChevronLeft />}
        </Button>
      </Box>
    </>
  )
}
