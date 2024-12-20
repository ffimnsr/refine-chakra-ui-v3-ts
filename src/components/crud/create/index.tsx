import React from "react"
import {
  useNavigation,
  useTranslate,
  useUserFriendlyName,
  useRefineContext,
  useRouterType,
  useResource,
  useBack,
} from "@refinedev/core"
import { Box, Heading, HStack, IconButton, Spinner } from "@chakra-ui/react"

import { LuArrowLeft } from "react-icons/lu"

import { Breadcrumb, SaveButton, type SaveButtonProps } from "@components"
import type { CreateProps } from "../types"
import { RefinePageHeaderClassNames } from "@refinedev/ui-types"
import { useColorModeValue } from "@components"

export const Create: React.FC<CreateProps> = (props) => {
  const {
    children,
    saveButtonProps: saveButtonPropsFromProps,
    isLoading,
    resource: resourceFromProps,
    footerButtons: footerButtonsFromProps,
    footerButtonProps,
    headerButtons: headerButtonsFromProps,
    headerButtonProps,
    wrapperProps,
    contentProps,
    headerProps,
    goBack: goBackFromProps,
    breadcrumb: breadcrumbFromProps,
    title,
  } = props
  const translate = useTranslate()
  const {
    options: { breadcrumb: globalBreadcrumb } = {},
  } = useRefineContext()

  const routerType = useRouterType()
  const back = useBack()
  const { goBack } = useNavigation()
  const getUserFriendlyName = useUserFriendlyName()

  const { resource, action, identifier } = useResource(resourceFromProps)

  const breadcrumb =
    typeof breadcrumbFromProps === "undefined"
      ? globalBreadcrumb
      : breadcrumbFromProps

  const saveButtonProps: SaveButtonProps = {
    ...(isLoading ? { disabled: true } : {}),
    ...saveButtonPropsFromProps,
  }

  const defaultFooterButtons = <SaveButton {...saveButtonProps} />

  const buttonBack =
    goBackFromProps === (false || null) ? null : (
      <IconButton
        aria-label="back"
        variant="ghost"
        size="sm"
        onClick={
          action !== "list" || typeof action !== "undefined"
            ? routerType === "legacy"
              ? goBack
              : back
            : undefined
        }
      >
        {typeof goBackFromProps !== "undefined" ? (
          goBackFromProps
        ) : (
          <LuArrowLeft />
        )}
      </IconButton>
    )

  const headerButtons = headerButtonsFromProps
    ? typeof headerButtonsFromProps === "function"
      ? headerButtonsFromProps({
          defaultButtons: null,
        })
      : headerButtonsFromProps
    : null

  const footerButtons = footerButtonsFromProps
    ? typeof footerButtonsFromProps === "function"
      ? footerButtonsFromProps({
          defaultButtons: defaultFooterButtons,
          saveButtonProps,
        })
      : footerButtonsFromProps
    : defaultFooterButtons

  const renderTitle = () => {
    if (title === false) return null

    if (title) {
      if (typeof title === "string" || typeof title === "number") {
        return (
          <Heading
            as="h3"
            size="lg"
            className={RefinePageHeaderClassNames.Title}
          >
            {title}
          </Heading>
        )
      }

      return title
    }

    return (
      <Heading as="h3" size="lg" className={RefinePageHeaderClassNames.Title}>
        {translate(
          `${identifier}.titles.create`,
          `Create ${getUserFriendlyName(
            resource?.meta?.label ??
              resource?.options?.label ??
              resource?.label ??
              identifier,
            "singular",
          )}`,
        )}
      </Heading>
    )
  }

  return (
    <Box
      position="relative"
      backgroundColor={useColorModeValue("white", "gray.800")}
      borderRadius="md"
      px="4"
      py="3"
      {...wrapperProps}
    >
      {isLoading && (
        <Spinner
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        />
      )}
      <Box
        mb="3"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap={{ base: "wrap", md: "nowrap" }}
        gap="3"
        {...headerProps}
      >
        <Box minW={200}>
          {typeof breadcrumb !== "undefined" ? (
            <>{breadcrumb}</>
          ) : (
            <Breadcrumb />
          )}
          <HStack>
            {buttonBack}
            {renderTitle()}
          </HStack>
        </Box>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent={{ base: "flex-start", md: "flex-end" }}
          gap="2"
          {...headerButtonProps}
        >
          {headerButtons}
        </Box>
      </Box>
      <Box opacity={isLoading ? 0.5 : undefined} {...contentProps}>
        {children}
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        gap="2"
        mt="8"
        {...footerButtonProps}
      >
        {footerButtons}
      </Box>
    </Box>
  )
}
