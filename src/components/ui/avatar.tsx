"use client"

import type {
  GroupProps,
  SlotRecipeProps,
  SystemStyleObject,
} from "@chakra-ui/react"
import {
  Avatar as ChakraAvatar,
  Group,
  chakra,
  useSlotRecipe,
} from "@chakra-ui/react"
import { Avatar as ArkAvatar, useAvatar } from "@ark-ui/react"
import * as React from "react"

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>

export interface AvatarProps
  extends Omit<ArkAvatar.RootProviderProps, "value"> {
  name?: string
  src?: string
  srcSet?: string
  loading?: ImageProps["loading"]
  icon?: React.ReactElement
  fallback?: React.ReactNode
  size?: "full" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
}

const ArkAvatarRootProvider = chakra(ArkAvatar.RootProvider)
const ArkAvatarImage = chakra(ArkAvatar.Image)
const ArkAvatarFallback = chakra(ArkAvatar.Fallback)

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  function Avatar(props, ref) {
    const avatar = useAvatar()
    const recipe = useSlotRecipe({
      key: "avatar",
    })

    const { name, src, srcSet, loading, icon, fallback, children, size, ...rest } =
      props

    const styles = recipe({ size: size ?? "sm" })

    return (
      <ArkAvatarRootProvider
        css={styles.root}
        value={avatar}
        ref={ref}
        {...rest}
      >
        <AvatarFallback css={styles.fallback} name={name} icon={icon}>
          {fallback}
        </AvatarFallback>
        <ArkAvatarImage
          css={styles.image}
          src={src}
          srcSet={srcSet}
          loading={loading}
        />
        {children}
      </ArkAvatarRootProvider>
    )
  },
)

interface AvatarFallbackProps extends ArkAvatar.FallbackProps {
  name?: string
  icon?: React.ReactElement
  css?: SystemStyleObject
}

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  function AvatarFallback(props, ref) {
    const { name, icon, children, ...rest } = props
    return (
      <ArkAvatarFallback ref={ref} {...rest}>
        {children}
        {name != null && children == null && <>{getInitials(name)}</>}
        {name == null && children == null && (
          <ChakraAvatar.Icon asChild={!!icon}>{icon}</ChakraAvatar.Icon>
        )}
      </ArkAvatarFallback>
    )
  },
)

function getInitials(name: string) {
  const names = name.trim().split(" ")
  const firstName = names[0] != null ? names[0] : ""
  const lastName = names.length > 1 ? names[names.length - 1] : ""
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0)
}

interface AvatarGroupProps extends GroupProps, SlotRecipeProps<"avatar"> {}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup(props, ref) {
    const { size, variant, borderless, ...rest } = props
    return (
      <ChakraAvatar.PropsProvider value={{ size, variant, borderless }}>
        <Group gap="0" spaceX="-3" ref={ref} {...rest} />
      </ChakraAvatar.PropsProvider>
    )
  },
)
