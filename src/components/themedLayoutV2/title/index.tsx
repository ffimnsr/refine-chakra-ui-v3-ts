import React from "react"
import {
  useRouterContext,
  useRouterType,
  useLink,
  useRefineOptions,
} from "@refinedev/core"
import { Link as ChakraLink, Icon, HStack, Heading } from "@chakra-ui/react"
import type { RefineLayoutThemedTitleProps } from "../types"

export const ThemedTitleV2: React.FC<RefineLayoutThemedTitleProps> = ({
  collapsed,
  icon: iconFromProps,
  text: textFromProps,
  wrapperStyles,
}) => {
  const {
    title: { icon: defaultIcon, text: defaultText } = {},
  } = useRefineOptions()
  const icon =
    typeof iconFromProps === "undefined" ? defaultIcon : iconFromProps
  const text =
    typeof textFromProps === "undefined" ? defaultText : textFromProps
  const routerType = useRouterType()
  const NewLink = useLink()
  const { Link: LegacyLink } = useRouterContext()

  const Link = routerType === "legacy" ? LegacyLink : NewLink

  return (
    <ChakraLink
      fontSize="inherit"
      textDecoration="none"
      _hover={{
        textDecoration: "none",
      }}
      asChild
    >
      <Link to="/">
        <HStack
          gap="8px"
          justifyContent="center"
          alignItems="center"
          fontSize="inherit"
          style={{
            ...wrapperStyles,
          }}
        >
          <Icon height="24px" width="24px" color="brand.500">
            {icon}
          </Icon>

          {!collapsed && (
            <Heading as="h6" fontWeight={700} fontSize="inherit">
              {text}
            </Heading>
          )}
        </HStack>
      </Link>
    </ChakraLink>
  )
}
