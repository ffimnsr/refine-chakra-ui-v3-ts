import React from "react"
import { useSaveButton } from "@refinedev/core"
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types"
import { LuSave } from "react-icons/lu"

import type { SaveButtonProps } from "../types"
import { IconButton } from "@components/ui/icon-button"
import { Button } from "@components/ui/button"

/**
 * `<SaveButton>` uses Chakra UI {@link https://chakra-ui.com/docs/components/button `<Button> `}.
 * It uses it for presantation purposes only. Some of the hooks that refine has adds features to this button.
 *
 * @see {@link https://refine.dev/docs/api-reference/chakra-ui/components/buttons/save-button} for more details.
 */
export const SaveButton: React.FC<SaveButtonProps> = ({
  hideText = false,
  svgIconProps,
  children,
  ...rest
}) => {
  const { label } = useSaveButton()

  return hideText ? (
    <IconButton
      colorScheme="green"
      aria-label={label}
      data-testid={RefineButtonTestIds.SaveButton}
      className={RefineButtonClassNames.SaveButton}
      {...rest}
    >
      <LuSave size={20} {...svgIconProps} />
    </IconButton>
  ) : (
    <Button
      colorScheme="green"
      data-testid={RefineButtonTestIds.SaveButton}
      className={RefineButtonClassNames.SaveButton}
      {...rest}
    >
      <LuSave size={20} {...svgIconProps} />
      {children ?? label}
    </Button>
  )
}
