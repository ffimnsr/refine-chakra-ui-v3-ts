import { Drawer as ChakraDrawer, Portal } from "@chakra-ui/react"
import { Dialog as ArkDialog } from "@ark-ui/react"
import { CloseButton } from "./close-button"
import * as React from "react"

interface DrawerContentProps extends ArkDialog.ContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement>
}

export const DrawerContent = React.forwardRef<
  HTMLDivElement,
  DrawerContentProps
>(function DrawerContent(props, ref) {
  const { children, portalled = true, portalRef, ...rest } = props
  return (
    <Portal disabled={!portalled} container={portalRef}>
      <ArkDialog.Positioner>
        <ArkDialog.Content ref={ref} {...rest} asChild={false}>
          {children}
        </ArkDialog.Content>
      </ArkDialog.Positioner>
    </Portal>
  )
})

export const DrawerCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  ArkDialog.CloseTriggerProps
>(function DrawerCloseTrigger(props, ref) {
  return (
    <ArkDialog.CloseTrigger
      style={{
        position: "absolute",
        top: "2rem",
        right: "2rem",
      }}
      {...props}
      asChild
    >
      <CloseButton size="sm" ref={ref} />
    </ArkDialog.CloseTrigger>
  )
})

export const DrawerTrigger = ArkDialog.Trigger
export const DrawerRootProvider = ArkDialog.RootProvider
export const DrawerRoot = ArkDialog.Root
export const DrawerFooter = ChakraDrawer.Footer
export const DrawerHeader = ChakraDrawer.Header
export const DrawerBody = ChakraDrawer.Body
export const DrawerBackdrop = ArkDialog.Backdrop
export const DrawerDescription = ArkDialog.Description
export const DrawerTitle = ArkDialog.Title
export const DrawerActionTrigger = ChakraDrawer.ActionTrigger
