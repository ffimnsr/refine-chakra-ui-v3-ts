import React, { useState } from "react"
import {
  Input,
  IconButton,
  VStack,
  HStack,
} from "@chakra-ui/react"
import { FaFilter, FaX, FaCheck } from "react-icons/fa6"

import type { ColumnButtonProps } from "../../interfaces"
import { MenuContent, MenuRoot, MenuTrigger } from "../ui/menu"

export const ColumnFilter: React.FC<ColumnButtonProps> = ({ column }) => {
  const [state, setState] = useState(null as null | { value: any })

  if (!column.getCanFilter()) {
    return null
  }

  const open = () =>
    setState({
      value: column.getFilterValue(),
    })

  const close = () => setState(null)

  const change = (value: any) => setState({ value })

  const clear = () => {
    column.setFilterValue(undefined)
    close()
  }

  const save = () => {
    if (!state) return
    column.setFilterValue(state.value)
    close()
  }

  const renderFilterElement = () => {
    // eslint-disable-next-line
    const FilterComponent = (column.columnDef?.meta as any)?.filterElement

    if (!FilterComponent && !!state) {
      return (
        <Input
          borderRadius="md"
          size="sm"
          autoComplete="off"
          value={state.value}
          onChange={(e) => change(e.target.value)}
        />
      )
    }

    return (
      <FilterComponent
        value={state?.value}
        onChange={(e: any) => change(e.target.value)}
      />
    )
  }

  return (
    <MenuRoot open={!!state} onExitComplete={close}>
      <MenuTrigger asChild>
        <IconButton
          onClick={open}
          aria-label="Options"
          variant="subtle"
          size="xs"
        >
          <FaFilter size="16" />
        </IconButton>
      </MenuTrigger>
      <MenuContent>
        {!!state && (

          <VStack align="flex-start">
            {renderFilterElement()}
            <HStack gap="1">
              <IconButton
                aria-label="Clear"
                size="sm"
                colorScheme="red"
                onClick={clear}
              >
                <FaX size={18} />
              </IconButton>
              <IconButton
                aria-label="Save"
                size="sm"
                onClick={save}
                colorScheme="green"
              >
                <FaCheck size={18} />
              </IconButton>
            </HStack>
          </VStack>
        )}
      </MenuContent>
    </MenuRoot>
  )
}
