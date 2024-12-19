import React from "react"
import {
  type LoginPageProps,
  type LoginFormTypes,
  useRouterType,
  useLink,
  useRouterContext,
  useLogin,
  useTranslate,
  type BaseRecord,
  type HttpError,
  useActiveAuthProvider,
} from "@refinedev/core"
import {
  Box,
  Heading,
  type BoxProps,
  VStack,
  Input,
  Link as ChakraLink,
  HStack,
  Separator,
} from "@chakra-ui/react"
import { useForm } from "@refinedev/react-hook-form"
import { FormProvider } from "react-hook-form"

import { layoutProps, cardProps } from "../styles"
import type { FormPropsType } from "../.."
import { ThemedTitleV2 } from "@components"
import { Button } from "@components/ui/button"
import { useColorModeValue } from "@components/ui/color-mode"
import { Field } from "@components/ui/field"
import { Checkbox } from "@components/ui/checkbox"

type LoginProps = LoginPageProps<
  BoxProps,
  BoxProps,
  FormPropsType<LoginFormTypes>
>

export const LoginPage: React.FC<LoginProps> = ({
  providers,
  registerLink,
  forgotPasswordLink,
  rememberMe,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  title,
  hideForm,
  mutationVariables,
}) => {
  const { onSubmit, ...useFormProps } = formProps || {}

  const authProvider = useActiveAuthProvider()
  const { mutate: login } = useLogin<LoginFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  })
  const translate = useTranslate()
  const routerType = useRouterType()
  const NewLink = useLink()
  const { Link: LegacyLink } = useRouterContext()
  const Link = routerType === "legacy" ? LegacyLink : NewLink
  const methods = useForm<BaseRecord, HttpError, LoginFormTypes>({
    ...useFormProps,
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          <VStack>
            {providers.map((provider) => (
              <Button
                key={provider.name}
                variant="outline"
                width="full"
                fontSize="sm"
                onClick={() =>
                  login({
                    ...mutationVariables,
                    providerName: provider.name,
                  })
                }
              >
                {provider?.icon}
                {/* biome-ignore lint/a11y/noLabelWithoutControl: no-need for input */}
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "32px",
          fontSize: "20px",
        }}
      >
        {title ?? <ThemedTitleV2 collapsed={false} />}
      </div>
    )

  const allContentProps = { ...cardProps, ...contentProps }
  const content = (
    <Box
      bg="chakra-body-bg"
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
        {translate("pages.login.title", "Sign in to your account")}
      </Heading>
      {renderProviders()}
      {!hideForm && (
        <form
          onSubmit={handleSubmit((data) => {
            if (onSubmit) {
              return onSubmit(data)
            }

            return login({ ...mutationVariables, ...data })
          })}
        >
          <Field
            mt="6"
            label={translate("pages.login.fields.email", "Email")}
            invalid={!!errors?.email}
            errorText={errors.email?.message}
          >
            <Input
              id="email"
              autoComplete="current-password"
              placeholder="Email"
              type="text"
              {...register("email", {
                required: translate(
                  "pages.login.errors.requiredEmail",
                  "Email is required",
                ),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: translate(
                    "pages.login.errors.validEmail",
                    "Invalid email address",
                  ),
                },
              })}
            />
          </Field>

          <Field
            mt="6"
            label={translate("pages.login.fields.password", "Password")}
            invalid={!!errors?.password}
            errorText={errors.password?.message}
          >
            <Input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: translate(
                  "pages.login.errors.requiredPassword",
                  "Password is required",
                ),
              })}
            />
          </Field>

          {rememberMe ?? (
            <Checkbox {...register("remember")} mt="6">
              {translate("pages.login.buttons.rememberMe", "Remember me")}
            </Checkbox>
          )}

          <Button mt="6" type="submit" width="full" colorScheme="brand">
            {translate("pages.login.signin", "Sign in")}
          </Button>

          <Box mt="6">
            <HStack justifyContent="space-between" fontSize="12px">
              {forgotPasswordLink ?? (
                <ChakraLink
                  as={Link}
                  color={importantTextColor}
                  href="/forgot-password"
                >
                  {translate(
                    "pages.login.buttons.forgotPassword",
                    "Forgot password?",
                  )}
                </ChakraLink>
              )}
              {registerLink ?? (
                <Box>
                  <span>
                    {translate(
                      "pages.login.buttons.noAccount",
                      "Don’t have an account?",
                    )}
                  </span>
                  <ChakraLink
                    color={importantTextColor}
                    ml="1"
                    as={Link}
                    fontWeight="bold"
                    href="/register"
                  >
                    {translate("pages.login.register", "Sign up")}
                  </ChakraLink>
                </Box>
              )}
            </HStack>
          </Box>
        </form>
      )}

      {hideForm && registerLink !== false && (
        <Box mt={6} textAlign="center">
          <span>
            {translate(
              "pages.login.buttons.noAccount",
              "Don’t have an account?",
            )}
          </span>
          <ChakraLink
            color={importantTextColor}
            ml="1"
            as={Link}
            fontWeight="bold"
            href="/register"
          >
            {translate("pages.login.register", "Sign up")}
          </ChakraLink>
        </Box>
      )}
    </Box>
  )

  return (
    <FormProvider {...methods}>
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
    </FormProvider>
  )
}
