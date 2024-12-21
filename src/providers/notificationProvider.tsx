import React from "react"
import type { NotificationProvider } from "@refinedev/core"
import { UndoableNotification } from "@components/undoableNotification"
import { createToaster } from "@chakra-ui/react"

export const useNotificationProvider = (): NotificationProvider => {
  const toast = createToaster({
    placement: "top-end",
    overlap: true,
  })

  return {
    open: ({
      key,
      message,
      type,
      description,
      undoableTimeout,
      cancelMutation,
    }) => {
      if (type === "progress") {
        if (key && toast.isVisible(key)) {
          toast.update(key, {
            description: (
              <UndoableNotification
                notificationKey={key}
                message={message}
                cancelMutation={cancelMutation}
                undoableTimeout={undoableTimeout}
              />
            ),
          })
        } else {
          toast.create({
            id: key,
            description: (
              <UndoableNotification
                notificationKey={key}
                message={message}
                cancelMutation={cancelMutation}
                undoableTimeout={undoableTimeout}
              />
            ),
          })
        }
      } else {
        if (key && toast.isVisible(key)) {
          toast.update(key, {
            title: message,
            description,
            type: type,
          })
        } else {
          toast.create({
            id: key,
            title: message,
            description,
            type: type,
          })
        }
      }
    },
    close: (key) => toast.dismiss(key),
  }
}
