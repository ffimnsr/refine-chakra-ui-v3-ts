import { Popover as ChakraPopover, Portal } from "@chakra-ui/react"
import { Popover as ArkPopover } from "@ark-ui/react"
import { CloseButton } from "./close-button"
import * as React from "react"

interface PopoverContentProps extends ArkPopover.ContentProps {
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement>
}

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  PopoverContentProps
>(function PopoverContent(props, ref) {
  const { portalled = true, portalRef, ...rest } = props
  return (
    <Portal disabled={!portalled} container={portalRef}>
      <ArkPopover.Positioner>
        <ArkPopover.Content ref={ref} {...rest} />
      </ArkPopover.Positioner>
    </Portal>
  )
})

export const PopoverArrow = React.forwardRef<
  HTMLDivElement,
  ArkPopover.ArrowProps
>(function PopoverArrow(props, ref) {
  return (
    <ArkPopover.Arrow {...props} ref={ref}>
      <ArkPopover.ArrowTip />
    </ArkPopover.Arrow>
  )
})

export const PopoverCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  ArkPopover.CloseTriggerProps
>(function PopoverCloseTrigger(props, ref) {
  return (
    <ArkPopover.CloseTrigger
      style={{
        position: "absolute",
        top: "1rem",
        right: "1rem",
      }}
      {...props}
      asChild
      ref={ref}
    >
      <CloseButton size="sm" />
    </ArkPopover.CloseTrigger>
  )
})

export const PopoverTitle = ArkPopover.Title
export const PopoverDescription = ArkPopover.Description
export const PopoverFooter = ChakraPopover.Footer
export const PopoverHeader = ChakraPopover.Header
export const PopoverRoot = ArkPopover.RootProvider
export const PopoverBody = ChakraPopover.Body
export const PopoverTrigger = ArkPopover.Trigger
