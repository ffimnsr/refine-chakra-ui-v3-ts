import { Portal } from "@chakra-ui/react"
import { Tooltip as ArkTooltip } from "@ark-ui/react"
import * as React from "react"

export interface TooltipProps extends ArkTooltip.RootProps {
  showArrow?: boolean
  portalled?: boolean
  portalRef?: React.RefObject<HTMLElement>
  content: React.ReactNode
  contentProps?: ArkTooltip.ContentProps
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
      <ArkTooltip.Root {...rest}>
        <ArkTooltip.Trigger asChild>{children}</ArkTooltip.Trigger>
        <Portal disabled={!portalled} container={portalRef}>
          <ArkTooltip.Positioner>
            <ArkTooltip.Content ref={ref} {...contentProps}>
              {showArrow && (
                <ArkTooltip.Arrow>
                  <ArkTooltip.ArrowTip />
                </ArkTooltip.Arrow>
              )}
              {content}
            </ArkTooltip.Content>
          </ArkTooltip.Positioner>
        </Portal>
      </ArkTooltip.Root>
    )
  },
)
