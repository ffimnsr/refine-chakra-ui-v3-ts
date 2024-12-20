import React from "react"
import {
  type AutoSaveIndicatorProps,
  useTranslate,
  AutoSaveIndicator as AutoSaveIndicatorCore,
} from "@refinedev/core"
import { Text, Span } from "@chakra-ui/react"
import {
  LuCircleDot,
  LuRefreshCw,
  LuCircleCheck,
  LuCircleAlert,
} from "react-icons/lu"

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
  status,
  elements: {
    success = (
      <Message
        translationKey="autoSave.success"
        defaultMessage="saved"
        icon={<LuCircleCheck size="18px" />}
      />
    ),
    error = (
      <Message
        translationKey="autoSave.error"
        defaultMessage="auto save failure"
        icon={<LuCircleAlert size="18px" />}
      />
    ),
    loading = (
      <Message
        translationKey="autoSave.loading"
        defaultMessage="saving..."
        icon={<LuRefreshCw size="18px" />}
      />
    ),
    idle = (
      <Message
        translationKey="autoSave.idle"
        defaultMessage="waiting for changes"
        icon={<LuCircleDot size="18px" />}
      />
    ),
  } = {},
}) => {
  return (
    <AutoSaveIndicatorCore
      status={status}
      elements={{
        success,
        error,
        loading,
        idle,
      }}
    />
  )
}

const Message = ({
  translationKey,
  defaultMessage,
  icon,
}: {
  translationKey: string
  defaultMessage: string
  icon: React.ReactNode
}) => {
  const translate = useTranslate()

  return (
    <Text
      display="flex"
      alignItems="center"
      flexWrap="wrap"
      color="gray.700"
      marginRight="2"
      fontSize="sm"
    >
      {translate(translationKey, defaultMessage)}
      <Span ml="3px">{icon}</Span>
    </Text>
  )
}
