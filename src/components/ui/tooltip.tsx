import {
  Tooltip as ChakraTooltip,
  type HTMLChakraProps,
  Portal,
} from "@chakra-ui/react"
import type { Tooltip as ArkTooltip } from "@ark-ui/react"
import * as React from "react"

export interface TooltipTriggerProps
  extends HTMLChakraProps<"button", ArkTooltip.TriggerProps> {}
declare const TooltipTrigger: React.ForwardRefExoticComponent<
  TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>
>

export interface TooltipProps extends ChakraTooltip.RootProps {
  showArrow?: boolean
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement>
  content: React.ReactNode
  contentProps?: ChakraTooltip.ContentProps
  disabled?: boolean
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(props, ref) {
    const {
      showArrow,
      children,
      disabled,
      portalled,
      content,
      contentProps,
      portalRef,
      ...rest
    } = props

    if (disabled) return children

    return (
      <ChakraTooltip.Root {...rest}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <Portal disabled={!portalled} container={portalRef}>
          <ChakraTooltip.Positioner>
            <ChakraTooltip.Content ref={ref} {...contentProps}>
              {showArrow && (
                <ChakraTooltip.Arrow>
                  <ChakraTooltip.ArrowTip />
                </ChakraTooltip.Arrow>
              )}
              {content}
            </ChakraTooltip.Content>
          </ChakraTooltip.Positioner>
        </Portal>
      </ChakraTooltip.Root>
    )
  },
)
