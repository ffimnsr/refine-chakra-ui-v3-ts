import React from "react"
import type { MutationMode } from "@refinedev/core"
import { VStack, Stack, Text, Box, HStack } from "@chakra-ui/react"
import { Radio, RadioGroup } from "../ui/radio"

interface Props {
  currentMutationMode: MutationMode
  onMutationModeChange: (mode: MutationMode) => void
}

const MutationModePicker: React.FC<Props> = ({
  currentMutationMode,
  onMutationModeChange,
}) => {
  return (
    <Box
      boxShadow="lg"
      boxShadowColor="gray.200"
      bgColor="white"
      p="6"
      rounded="md"
      position="fixed"
      bottom="16px"
      left="50%"
      transform="translateX(-50%)"
      paddingX="10px"
      paddingY="16px"
    >
      <VStack align="center">
        <RadioGroup
          name="mutation-mode"
          onValueChange={(e) => onMutationModeChange(e.value as MutationMode)}
          value={currentMutationMode}
        >
          <HStack gap={4}>
            <Radio value={"pessimistic"}>Pessimistic</Radio>
            <Radio value={"optimistic"}>Optimistic</Radio>
            <Radio value={"undoable"}>Undoable</Radio>
          </HStack>
        </RadioGroup>
        <Text padding={4}>
          <a
            href="https://refine.dev/docs/advanced-tutorials/mutation-mode/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Refer to the mutation mode documentation for more information. →
          </a>
        </Text>
      </VStack>
    </Box>
  )
}

export default MutationModePicker
