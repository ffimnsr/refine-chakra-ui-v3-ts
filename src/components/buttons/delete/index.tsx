import React, { useState } from "react"
import { useDeleteButton } from "@refinedev/core"
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types"

import { HStack, usePopover } from "@chakra-ui/react"
import { LuTrash } from "react-icons/lu"

import type { DeleteButtonProps } from "../types"
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  PopoverRootProvider,
} from "@components/ui/popover"
import { IconButton } from "@components/ui/icon-button"
import { Button } from "@components/ui/button"

/**
 * `<DeleteButton>` uses Chakra UI {@link https://chakra-ui.com/docs/components/button `<Button>`} and {@link https://chakra-ui.com/docs/components/popover `<Popover>`} components.
 * When you try to delete something, a dialog modal shows up and asks for confirmation. When confirmed it executes the `useDelete` method provided by your `dataProvider`.
 *
 * @see {@link https://refine.dev/docs/api-reference/chakra-ui/components/buttons/delete-button} for more details.
 */
export const DeleteButton: React.FC<DeleteButtonProps> = ({
  resource: resourceNameFromProps,
  recordItemId,
  onSuccess,
  mutationMode: mutationModeProp,
  children,
  successNotification,
  errorNotification,
  hideText = false,
  accessControl,
  meta,
  metaData: _,
  invalidates,
  dataProviderName,
  confirmTitle,
  confirmOkText,
  confirmCancelText,
  svgIconProps,
  ...rest
}) => {
  const {
    onConfirm,
    label,
    title,
    disabled,
    hidden,
    loading,
    confirmTitle: defaultConfirmTitle,
    confirmOkLabel: defaultConfirmOkLabel,
    cancelLabel: defaultCancelLabel,
  } = useDeleteButton({
    resource: resourceNameFromProps,
    id: recordItemId,
    onSuccess,
    mutationMode: mutationModeProp,
    successNotification,
    errorNotification,
    accessControl,
    meta,
    dataProviderName,
    invalidates,
  })

  const popover = usePopover({
    positioning: {
      placement: "bottom-start",
    },
  })

  if (hidden) return null

  return (
    <PopoverRootProvider value={popover} lazyMount>
      <PopoverTrigger asChild>
        {hideText ? (
          <IconButton
            colorScheme="red"
            variant="outline"
            aria-label={title}
            onClick={() => popover.setOpen(!popover.open)}
            disabled={loading || disabled}
            loading={loading}
            data-testid={RefineButtonTestIds.DeleteButton}
            className={RefineButtonClassNames.DeleteButton}
            {...rest}
          >
            <LuTrash size={20} {...svgIconProps} />
          </IconButton>
        ) : (
          <Button
            colorScheme="red"
            variant="outline"
            onClick={() => popover.setOpen(!popover.open)}
            disabled={loading || disabled}
            loading={loading}
            title={title}
            data-testid={RefineButtonTestIds.DeleteButton}
            className={RefineButtonClassNames.DeleteButton}
            {...rest}
          >
            <LuTrash size={20} {...svgIconProps} />
            {children ?? label}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>{confirmTitle ?? defaultConfirmTitle}</PopoverHeader>
        <PopoverBody display="flex" justifyContent="center">
          <HStack>
            <Button onClick={() => popover.setOpen(!popover.open)} size="sm">
              {confirmCancelText ?? defaultCancelLabel}
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                onConfirm()
                popover.setOpen(!popover.open)
              }}
              autoFocus
              size="sm"
            >
              {confirmOkText ?? defaultConfirmOkLabel}
            </Button>
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </PopoverRootProvider>
  )
}
