import React from "react"
import type { OpenNotificationParams } from "@refinedev/core"
import { Box, createToaster, IconButton, Text } from "@chakra-ui/react"
import { LuRotateCw } from "react-icons/lu"
import {
  ProgressCircleRoot,
  ProgressCircleValueText,
} from "@components/ui/progress-circle"

export type UndoableNotificationProps = {
  notificationKey: OpenNotificationParams["key"]
  message: OpenNotificationParams["message"]
  cancelMutation: OpenNotificationParams["cancelMutation"]
  undoableTimeout: OpenNotificationParams["undoableTimeout"]
}

export const UndoableNotification: React.FC<UndoableNotificationProps> = ({
  notificationKey = "",
  message,
  cancelMutation,
  undoableTimeout = 0,
}) => {
  const toast = createToaster()

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      bg="chakra-body-bg"
      shadow="md"
      minW={320}
      p={2}
    >
      <ProgressCircleRoot value={undoableTimeout * 20} color="green">
        <ProgressCircleValueText>{undoableTimeout}</ProgressCircleValueText>
      </ProgressCircleRoot>
      <Text>{message}</Text>
      <IconButton
        aria-label="undo"
        variant="outline"
        onClick={() => {
          cancelMutation?.()
          toast.close(notificationKey)
        }}
      >
        <LuRotateCw size={18} />
      </IconButton>
    </Box>
  )
}
