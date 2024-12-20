import React from "react"
import { LuMinus, LuCheck } from "react-icons/lu"
import { Tooltip } from "@components/ui/tooltip"
import type { BooleanFieldProps } from "../types"

/**
 * This field is used to display boolean values. It uses the {@link https://chakra-ui.com/docs/components/tooltip `<Tooltip>`} values from Chakra UI.
 *
 * @see {@link https://refine.dev/docs/api-reference/chakra-ui/components/fields/boolean} for more details.
 */
export const BooleanField: React.FC<BooleanFieldProps> = ({
  value,
  valueLabelTrue = "true",
  valueLabelFalse = "false",
  trueIcon,
  falseIcon,
  svgIconProps,
  ...rest
}) => {
  return (
    <Tooltip content={value ? valueLabelTrue : valueLabelFalse} {...rest}>
      <span>
        {value
          ? (trueIcon ?? <LuCheck size={20} {...svgIconProps} />)
          : (falseIcon ?? <LuMinus size={20} {...svgIconProps} />)}
      </span>
    </Tooltip>
  )
}
