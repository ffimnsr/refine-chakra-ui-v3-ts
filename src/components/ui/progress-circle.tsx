import type { SystemStyleObject } from "@chakra-ui/react"
import {
  AbsoluteCenter,
  ProgressCircle as ChakraProgressCircle,
  type HTMLChakraProps,
} from "@chakra-ui/react"
import type { Progress as ArkProgress } from "@ark-ui/react"
import * as React from "react"

interface ChakraProgressCircleCircleProps
  extends HTMLChakraProps<"svg", ArkProgress.CircleBaseProps> {}
declare const ChakraProgressCircleCircle: React.ForwardRefExoticComponent<
  ChakraProgressCircleCircleProps & React.RefAttributes<SVGSVGElement>
>
interface ChakraProgressCircleTrackProps
  extends HTMLChakraProps<"circle", ArkProgress.TrackBaseProps> {}
declare const ChakraProgressCircleTrack: React.ForwardRefExoticComponent<
  ChakraProgressCircleTrackProps & React.RefAttributes<SVGCircleElement>
>
interface ChakraProgressCircleRangeProps
  extends HTMLChakraProps<"circle", ArkProgress.RangeBaseProps> {}
declare const ChakraProgressCircleRange: React.ForwardRefExoticComponent<
  ChakraProgressCircleRangeProps & React.RefAttributes<SVGCircleElement>
>

interface ProgressCircleRingProps extends ChakraProgressCircleCircleProps {
  trackColor?: SystemStyleObject["stroke"]
  cap?: SystemStyleObject["strokeLinecap"]
}

export const ProgressCircleRing = React.forwardRef<
  SVGSVGElement,
  ProgressCircleRingProps
>(function ProgressCircleRing(props, ref) {
  const { trackColor, cap, color, ...rest } = props
  return (
    <ChakraProgressCircleCircle {...rest} ref={ref}>
      <ChakraProgressCircleTrack stroke={trackColor} />
      <ChakraProgressCircleRange stroke={color} strokeLinecap={cap} />
    </ChakraProgressCircleCircle>
  )
})

export const ProgressCircleValueText = React.forwardRef<
  HTMLDivElement,
  ChakraProgressCircle.ValueTextProps
>(function ProgressCircleValueText(props, ref) {
  return (
    <AbsoluteCenter>
      <ChakraProgressCircle.ValueText {...props} ref={ref} />
    </AbsoluteCenter>
  )
})

export const ProgressCircleRoot = ChakraProgressCircle.Root
