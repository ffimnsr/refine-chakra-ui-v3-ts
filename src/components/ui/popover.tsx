import {
  Popover as ChakraPopover,
  Portal,
  type HTMLChakraProps,
} from "@chakra-ui/react"
import type { Popover as ArkPopover } from "@ark-ui/react"
import { CloseButton } from "./close-button"
import * as React from "react"

interface ChakraPopoverArrowProps
  extends HTMLChakraProps<"div", ArkPopover.ArrowBaseProps> {}
declare const ChakraPopoverArrow: React.ForwardRefExoticComponent<
  ChakraPopoverArrowProps & React.RefAttributes<HTMLDivElement>
>
interface ChakraPopoverCloseTriggerProps
  extends HTMLChakraProps<"button", ArkPopover.CloseTriggerBaseProps> {}
declare const ChakraPopoverCloseTrigger: React.ForwardRefExoticComponent<
  ChakraPopoverCloseTriggerProps & React.RefAttributes<HTMLButtonElement>
>
export interface ChakraPopoverContentProps
  extends HTMLChakraProps<"div", ArkPopover.ContentBaseProps> {}

interface PopoverContentProps extends ChakraPopoverContentProps {
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
      <ChakraPopover.Positioner>
        <ChakraPopover.Content ref={ref} {...rest} />
      </ChakraPopover.Positioner>
    </Portal>
  )
})

export const PopoverArrow = React.forwardRef<
  HTMLDivElement,
  ChakraPopoverArrowProps
>(function PopoverArrow(props, ref) {
  return (
    <ChakraPopoverArrow {...props} ref={ref}>
      <ChakraPopover.ArrowTip />
    </ChakraPopoverArrow>
  )
})

export const PopoverCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  ChakraPopoverCloseTriggerProps
>(function PopoverCloseTrigger(props, ref) {
  return (
    <ChakraPopoverCloseTrigger
      position="absolute"
      top="1"
      insetEnd="1"
      {...props}
      asChild
      ref={ref}
    >
      <CloseButton size="sm" />
    </ChakraPopoverCloseTrigger>
  )
})

export const PopoverTitle = ChakraPopover.Title
export const PopoverDescription = ChakraPopover.Description
export const PopoverFooter = ChakraPopover.Footer
export const PopoverHeader = ChakraPopover.Header
export const PopoverRoot = ChakraPopover.Root
export const PopoverBody = ChakraPopover.Body
export const PopoverTrigger = ChakraPopover.Trigger
