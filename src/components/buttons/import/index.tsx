import React from "react"
import { useImportButton } from "@refinedev/core"
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types"
import { IconFileImport } from "@tabler/icons-react"

import type { ImportButtonProps } from "../types"
import { Button } from "@components/ui/button"
import { IconButton } from "@components/ui/icon-button"

/**
 * `<ImportButton>` is compatible with the {@link https://refine.dev/docs/api-reference/core/hooks/import-export/useImport/ `useImport`} core hook.
 * It uses uses Chakra UI {@link https://chakra-ui.com/docs/components/button `<Button> component`} and native html {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input  `<input>`} element.
 *
 * @see {@link https://refine.dev/docs/api-reference/chakra-ui/components/buttons/import-button} for more details.
 */
export const ImportButton: React.FC<ImportButtonProps> = ({
  inputProps,
  hideText = false,
  loading = false,
  svgIconProps,
  children,
  ...rest
}) => {
  const { label } = useImportButton()

  return (
    <label htmlFor="contained-button-file">
      <input {...inputProps} id="contained-button-file" multiple hidden />
      {hideText ? (
        <IconButton
          variant="outline"
          as="span"
          aria-label={label}
          loading={loading}
          data-testid={RefineButtonTestIds.ImportButton}
          className={RefineButtonClassNames.ImportButton}
          {...rest}
        >
          <IconFileImport size={20} {...svgIconProps} />
        </IconButton>
      ) : (
        <Button
          variant="outline"
          as="span"
          loading={loading}
          data-testid={RefineButtonTestIds.ImportButton}
          className={RefineButtonClassNames.ImportButton}
          {...rest}
        >
          <IconFileImport size={20} {...svgIconProps} />
          {children ?? label}
        </Button>
      )}
    </label>
  )
}
