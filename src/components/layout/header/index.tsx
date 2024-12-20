import React from "react"
import { useGetIdentity, useActiveAuthProvider } from "@refinedev/core"
import { Box, Text, HStack } from "@chakra-ui/react"

import type { RefineLayoutHeaderProps } from "../types"
import { Avatar } from "@components/ui/avatar"

export const Header: React.FC<RefineLayoutHeaderProps> = () => {
  const authProvider = useActiveAuthProvider()
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  })

  const shouldRenderHeader = user && (user.name || user.avatar)

  return shouldRenderHeader ? (
    <Box
      py="2"
      px="4"
      display="flex"
      justifyContent="flex-end"
      w="full"
      bg="chakra-body-bg"
    >
      <HStack>
        <Text fontSize="sm" fontWeight="bold">
          {user?.name}
        </Text>
        <Avatar name={user?.name} src={user?.avatar} />
      </HStack>
    </Box>
  ) : null
}
