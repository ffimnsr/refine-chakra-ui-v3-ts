import React from "react"
import { useCreateButton } from "@refinedev/core"
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types"
import { Button, IconButton } from "@chakra-ui/react"
import { IconSquarePlus } from "@tabler/icons-react"

import type { CreateButtonProps } from "../types"

export const CreateButton: React.FC<CreateButtonProps> = ({
  resource: resourceNameFromProps,
  hideText = false,
  accessControl,
  svgIconProps,
  meta,
  children,
  onClick,
  ...rest
}) => {
  const { to, label, title, hidden, disabled, LinkComponent } = useCreateButton(
    {
      resource: resourceNameFromProps,
      accessControl,
      meta,
    },
  )

  if (hidden) return null

  return (
    <LinkComponent
      to={to}
      replace={false}
      onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
        if (disabled) {
          e.preventDefault()
          return
        }
        if (onClick) {
          e.preventDefault()
          onClick(e)
        }
      }}
    >
      {hideText ? (
        <IconButton
          colorScheme="brand"
          variant="outline"
          aria-label={label}
          title={title}
          disabled={disabled}
          data-testid={RefineButtonTestIds.CreateButton}
          className={RefineButtonClassNames.CreateButton}
          {...rest}
        >
          <IconSquarePlus size={20} {...svgIconProps} />
        </IconButton>
      ) : (
        <Button
          colorScheme="brand"
          disabled={disabled}
          title={title}
          data-testid={RefineButtonTestIds.CreateButton}
          className={RefineButtonClassNames.CreateButton}
          {...rest}
        >
          <IconSquarePlus size={20} />
          {children ?? label}
        </Button>
      )}
    </LinkComponent>
  )
}
