import React from "react"
import {
  useTranslate,
  useUpdatePassword,
  type UpdatePasswordFormTypes,
  type UpdatePasswordPageProps,
  type BaseRecord,
  type HttpError,
  useActiveAuthProvider,
} from "@refinedev/core"
import { Box, type BoxProps, Heading, Input } from "@chakra-ui/react"
import { useForm } from "@refinedev/react-hook-form"

import { layoutProps, cardProps } from "../styles"
import type { FormPropsType } from "../.."
import { ThemedTitleV2 } from "@components"
import { useColorModeValue } from "@components/ui/color-mode"
import { Field } from "@components/ui/field"
import { Button } from "@components/ui/button"

type UpdatePasswordProps = UpdatePasswordPageProps<
  BoxProps,
  BoxProps,
  FormPropsType<UpdatePasswordFormTypes>
>

export const UpdatePasswordPage: React.FC<UpdatePasswordProps> = ({
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  title,
  mutationVariables,
}) => {
  const { onSubmit, ...useFormProps } = formProps || {}
  const translate = useTranslate()
  const authProvider = useActiveAuthProvider()
  const { mutate } = useUpdatePassword<UpdatePasswordFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  })
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<BaseRecord, HttpError, UpdatePasswordFormTypes>({
    ...useFormProps,
  })

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
        {translate("pages.updatePassword.title", "Set New Password")}
      </Heading>
      <form
        onSubmit={handleSubmit((data) => {
          if (onSubmit) {
            return onSubmit(data)
          }

          return mutate({ ...mutationVariables, ...data })
        })}
      >
        <Field
          mb="3"
          label={translate(
            "pages.updatePassword.fields.password",
            "New Password",
          )}
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
                "pages.updatePassword.errors.requiredPassword",
                "Password required",
              ),
            })}
          />
        </Field>

        <Field
          mb="3"
          lable={translate(
            "pages.updatePassword.fields.confirmPassword",
            "Confirm New Password",
          )}
          invalid={!!errors?.confirmPassword}
          errorText={errors.confirmPassword?.message}
        >
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: translate(
                "pages.updatePassword.errors.requiredConfirmPassword",
                "Confirm password is required",
              ),
              validate: (val: any) => {
                if (watch("password") !== val) {
                  return translate(
                    "pages.updatePassword.errors.confirmPasswordNotMatch",
                    "Passwords do not match",
                  )
                }
                return
              },
            })}
          />
        </Field>

        <Button mt="6" type="submit" width="full" colorScheme="brand">
          {translate("pages.updatePassword.buttons.submit", "Update")}
        </Button>
      </form>
    </Box>
  )

  const layoutPropsBox = layoutProps as BoxProps
  const allWrapperProps = { ...layoutPropsBox, ...wrapperProps }
  return (
    <Box {...allWrapperProps}>
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
