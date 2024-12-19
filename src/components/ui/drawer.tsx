import {
  Drawer as ChakraDrawer,
  Portal,
  type HTMLChakraProps,
} from "@chakra-ui/react"
import type { Dialog as ArkDialog } from "@ark-ui/react"
import { CloseButton } from "./close-button"
import * as React from "react"

export interface ChakraDrawerContentProps
  extends HTMLChakraProps<"section", ArkDialog.ContentBaseProps> {}
export interface ChakraDrawerCloseTriggerProps
  extends HTMLChakraProps<"button", ArkDialog.CloseTriggerBaseProps> {}
export declare const ChakraDrawerCloseTrigger: React.ForwardRefExoticComponent<
  ChakraDrawerCloseTriggerProps & React.RefAttributes<HTMLButtonElement>
>
export interface ChakraDrawerPositionerProps
  extends HTMLChakraProps<"div", ArkDialog.PositionerBaseProps> {}
export declare const ChakraDrawerPositioner: React.ForwardRefExoticComponent<
  ChakraDrawerPositionerProps & React.RefAttributes<HTMLDivElement>
>
export interface ChakraDrawerContentProps
  extends HTMLChakraProps<"section", ArkDialog.ContentBaseProps> {}
export declare const ChakraDrawerContent: React.ForwardRefExoticComponent<
  ChakraDrawerContentProps & React.RefAttributes<HTMLDivElement>
>

interface DrawerContentProps extends ChakraDrawerContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement>
  offset?: ChakraDrawerContentProps["padding"]
}

export const DrawerContent = React.forwardRef<
  HTMLDivElement,
  DrawerContentProps
>(function DrawerContent(props, ref) {
  const { children, portalled = true, portalRef, offset, ...rest } = props
  return (
    <Portal disabled={!portalled} container={portalRef}>
      <ChakraDrawerPositioner padding={offset}>
        <ChakraDrawerContent ref={ref} {...rest} asChild={false}>
          {children}
        </ChakraDrawerContent>
      </ChakraDrawerPositioner>
    </Portal>
  )
})

export const DrawerCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  ChakraDrawerCloseTriggerProps
>(function DrawerCloseTrigger(props, ref) {
  return (
    <ChakraDrawerCloseTrigger
      position="absolute"
      top="2"
      insetEnd="2"
      {...props}
      asChild
    >
      <CloseButton size="sm" ref={ref} />
    </ChakraDrawerCloseTrigger>
  )
})

export const DrawerTrigger = ChakraDrawer.Trigger
export const DrawerRoot = ChakraDrawer.Root
export const DrawerFooter = ChakraDrawer.Footer
export const DrawerHeader = ChakraDrawer.Header
export const DrawerBody = ChakraDrawer.Body
export const DrawerBackdrop = ChakraDrawer.Backdrop
export const DrawerDescription = ChakraDrawer.Description
export const DrawerTitle = ChakraDrawer.Title
export const DrawerActionTrigger = ChakraDrawer.ActionTrigger
