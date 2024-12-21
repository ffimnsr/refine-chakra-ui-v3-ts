import React from "react"
import {
  useTranslate,
  useRouterType,
  useLink,
  useRouterContext,
  useRegister,
  type RegisterPageProps,
  type RegisterFormTypes,
  type BaseRecord,
  type HttpError,
  useActiveAuthProvider,
} from "@refinedev/core"
import {
  Box,
  type BoxProps,
  Heading,
  Input,
  VStack,
  Link as ChakraLink,
  Separator,
} from "@chakra-ui/react"
import { useForm } from "@refinedev/react-hook-form"

import { layoutProps, cardProps } from "../styles"
import type { FormPropsType } from "../.."
import { ThemedTitleV2 } from "@components"
import { Button } from "@components/ui/button"
import { useColorModeValue } from "@components/ui/color-mode"
import { Field } from "@components/ui/field"

type RegisterProps = RegisterPageProps<
  BoxProps,
  BoxProps,
  FormPropsType<RegisterFormTypes>
>

export const RegisterPage: React.FC<RegisterProps> = ({
  providers,
  loginLink,
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  title,
  hideForm,
  mutationVariables,
}) => {
  const { onSubmit, ...useFormProps } = formProps || {}

  const routerType = useRouterType()
  const NewLink = useLink()
  const { Link: LegacyLink } = useRouterContext()
  const Link = routerType === "legacy" ? LegacyLink : NewLink
  const translate = useTranslate()
  const authProvider = useActiveAuthProvider()
  const { mutate } = useRegister({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BaseRecord, HttpError, RegisterFormTypes>({
    ...useFormProps,
  })

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          <VStack>
            {providers.map((provider) => (
              <Button
                key={provider.name}
                variant="subtle"
                fontSize="sm"
                width="full"
                onClick={() =>
                  mutate({
                    ...mutationVariables,
                    providerName: provider.name,
                  })
                }
              >
                {provider?.icon}
                {/* biome-ignore lint/a11y/noLabelWithoutControl: no-need */}
                {provider.label ?? <label>{provider.label}</label>}
              </Button>
            ))}
          </VStack>
          {!hideForm && <Separator my="6" />}
        </>
      )
    }
    return null
  }

  const importantTextColor = useColorModeValue("brand.500", "brand.200")

  const PageTitle =
    title === false ? null : (
      <Box
        display="flex"
        justifyContent="center"
        marginBottom="32px"
        fontSize="20px"
      >
        {title ?? <ThemedTitleV2 collapsed={false} />}
      </Box>
    )

  const allContentProps = { ...cardProps, ...contentProps }
  const content = (
    <Box
      borderWidth="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      backgroundColor={useColorModeValue("white", "gray.800")}
      {...allContentProps}
    >
      <Heading
        mb="8"
        textAlign="center"
        fontSize="2xl"
        color={importantTextColor}
      >
        {translate("pages.register.title", "Sign up for your account")}
      </Heading>
      {renderProviders()}
      {!hideForm && (
        <form
          onSubmit={handleSubmit((data) => {
            if (onSubmit) {
              return onSubmit(data)
            }

            return mutate({ ...mutationVariables, ...data })
          })}
        >
          <Field
            mt="6"
            label={translate("pages.register.fields.email", "Email")}
            invalid={!!errors?.email}
            errorText={errors.email?.message}
          >
            <Input
              id="email"
              type="text"
              autoComplete="email"
              placeholder="Email"
              {...register("email", {
                required: translate(
                  "pages.register.errors.requiredEmail",
                  "Email is required",
                ),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: translate(
                    "pages.register.errors.validEmail",
                    "Invalid email address",
                  ),
                },
              })}
            />
          </Field>

          <Field
            mt="6"
            label={translate("pages.register.fields.password", "Password")}
            invalid={!!errors?.password}
            errorText={errors.password?.message}
          >
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              {...register("password", {
                required: translate(
                  "pages.register.errors.requiredPassword",
                  "Password is required",
                ),
              })}
            />
          </Field>

          <Button mt="6" type="submit" width="full" colorScheme="brand">
            {translate("pages.register.buttons.submit", "Sign up")}
          </Button>

          {loginLink ?? (
            <Box
              display="flex"
              justifyContent="flex-end"
              mt="6"
              fontSize="12px"
            >
              <span>
                {translate(
                  "pages.register.buttons.haveAccount",
                  translate(
                    "pages.login.buttons.haveAccount",
                    "Have an account?",
                  ),
                )}
              </span>
              <ChakraLink
                color={importantTextColor}
                ml="1"
                fontWeight="bold"
                asChild
              >
                <Link to="/login">
                  {translate(
                    "pages.register.signin",
                    translate("pages.login.signin", "Sign in"),
                  )}
                </Link>
              </ChakraLink>
            </Box>
          )}
        </form>
      )}

      {hideForm && loginLink !== false && (
        <Box mt={6} textAlign="center">
          <span>
            {translate(
              "pages.register.buttons.haveAccount",
              "Have an account?",
            )}
          </span>
          <ChakraLink color={importantTextColor} ml="1" fontWeight="bold" asChild>
            <Link to="/login">
              {translate(
                "pages.register.signin",
                translate("pages.login.signin", "Sign in"),
              )}
            </Link>
          </ChakraLink>
        </Box>
      )}
    </Box>
  )

  return (
    <Box
      style={{
        ...layoutProps,
        justifyContent: hideForm ? "flex-start" : "center",
        paddingTop: hideForm ? "15dvh" : "16px",
      }}
      {...wrapperProps}
    >
      {renderContent ? (
        renderContent(content, PageTitle)
      ) : (
        <>
          {PageTitle}
          {content}
        </>
      )}
    </Box>
  )
}
