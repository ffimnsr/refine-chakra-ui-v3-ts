import React from "react"
import {
  matchResourceFromRoute,
  useBreadcrumb,
  useLink,
  useRefineContext,
  useResource,
  useRouterContext,
  useRouterType,
} from "@refinedev/core"
import type { RefineBreadcrumbProps } from "@refinedev/ui-types"

import { LuHouse } from "react-icons/lu"
import {
  BreadcrumbRoot,
  BreadcrumbLink,
  BreadcrumbCurrentLink,
  type BreadcrumbRootProps as ChakraBreadcrumbProps,
} from "@components/ui/breadcrumb"

export type BreadcrumbProps = RefineBreadcrumbProps<ChakraBreadcrumbProps>
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  breadcrumbProps,
  showHome = true,
  hideIcons = false,
  meta,
}) => {
  const routerType = useRouterType()
  const { breadcrumbs } = useBreadcrumb({ meta })
  const Link = useLink()
  const { Link: LegacyLink } = useRouterContext()
  const { hasDashboard } = useRefineContext()

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link

  if (breadcrumbs.length === 1) {
    return null
  }

  const { resources } = useResource()
  const rootRouteResource = matchResourceFromRoute("/", resources)

  return (
    <BreadcrumbRoot mb="3" {...breadcrumbProps}>
      {showHome && (hasDashboard || rootRouteResource?.found) && (
        <BreadcrumbLink asChild>
          <ActiveLink to="/">
            {rootRouteResource?.resource?.meta?.icon ?? <LuHouse size={20} />}
          </ActiveLink>
        </BreadcrumbLink>
      )}
      {breadcrumbs.map(({ label, icon, href }) => {
        return (
          <React.Fragment key={label}>
            {href ? (
              <BreadcrumbLink ml={2} asChild>
                <ActiveLink to={href}>
                  {!hideIcons && icon}
                  {label}
                </ActiveLink>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbCurrentLink ml={2}>{label}</BreadcrumbCurrentLink>
            )}
          </React.Fragment>
        )
      })}
    </BreadcrumbRoot>
  )
}
