import React from "react"
import {
  useRouterContext,
  useRouterType,
  useLink,
  type TitleProps,
} from "@refinedev/core"
import { Link as ChakraLink, Image } from "@chakra-ui/react"

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const routerType = useRouterType()
  const NewLink = useLink()
  const { Link: LegacyLink } = useRouterContext()

  const Link = routerType === "legacy" ? LegacyLink : NewLink

  return (
    <ChakraLink asChild>
      <Link to="/">
        {collapsed ? (
          <Image
            src="https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine-mini.svg"
            alt="Refine"
            minHeight="38px"
          />
        ) : (
          <Image
            src="https://refine.ams3.cdn.digitaloceanspaces.com/logo/refine.svg"
            alt="Refine"
            width="140px"
            minHeight="38px"
          />
        )}
      </Link>
    </ChakraLink>
  )
}
