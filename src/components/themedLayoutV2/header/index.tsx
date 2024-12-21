import React from "react"
import {
  useGetIdentity,
  useActiveAuthProvider,
  pickNotDeprecated,
} from "@refinedev/core"
import { Box, Text, HStack, type BoxProps } from "@chakra-ui/react"
import type { RefineThemedLayoutV2HeaderProps } from "../types"
import { HamburgerMenu } from "../hamburgerMenu"
import { Avatar } from "@components/ui/avatar"
import { useColorModeValue } from "@components/ui/color-mode"

export const ThemedHeaderV2: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky,
}) => {
  const authProvider = useActiveAuthProvider()
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  })

  let stickyProps: BoxProps = {}
  if (sticky) {
    stickyProps = {
      position: "sticky",
      top: 0,
      zIndex: 1,
    }
  }

  return (
    <Box
      py="2"
      px="4"
      display="flex"
      alignItems="center"
      w="full"
      height="64px"
      bgColor="refine.header.bg"
      borderBottom="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      {...stickyProps}
    >
      <Box
        w="full"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <HamburgerMenu />
        <HStack>
          {user?.name && (
            <Text
              fontSize="sm"
              fontWeight="bold"
              data-testid="header-user-name"
            >
              {user.name}
            </Text>
          )}
          {user?.avatar && (
            <Avatar name={user?.name || "Profile Photo"} src={user.avatar} />
          )}
        </HStack>
      </Box>
    </Box>
  )
}
