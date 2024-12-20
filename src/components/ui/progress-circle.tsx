import type { SystemStyleObject } from "@chakra-ui/react"
import {
  AbsoluteCenter,
  ProgressCircle as ChakraProgressCircle,
} from "@chakra-ui/react"
import { Progress as ArkProgress } from "@ark-ui/react"
import * as React from "react"

interface ProgressCircleRingProps extends ArkProgress.CircleProps {
  trackColor?: SystemStyleObject["stroke"]
  cap?: SystemStyleObject["strokeLinecap"]
}

export const ProgressCircleRing = React.forwardRef<
  SVGSVGElement,
  ProgressCircleRingProps
>(function ProgressCircleRing(props, ref) {
  const { trackColor, cap, color, ...rest } = props
  return (
    <ArkProgress.Circle {...rest} ref={ref}>
      <ArkProgress.CircleTrack />
      <ArkProgress.CircleRange />
    </ArkProgress.Circle>
  )
})

export const ProgressCircleValueText = React.forwardRef<
  HTMLDivElement,
  ArkProgress.ValueTextProps
>(function ProgressCircleValueText(props, ref) {
  return (
    <AbsoluteCenter>
      <ArkProgress.ValueText {...props} ref={ref} />
    </AbsoluteCenter>
  )
})

export const ProgressCircleRoot = ChakraProgressCircle.Root
