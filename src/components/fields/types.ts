import type { ReactChild, ReactNode } from "react"
import type { LinkProps, TextProps } from "@chakra-ui/react"

import type {
  RefineFieldBooleanProps,
  RefineFieldDateProps,
  RefineFieldEmailProps,
  RefineFieldFileProps,
  RefineFieldMarkdownProps,
  RefineFieldNumberProps,
  RefineFieldTagProps,
  RefineFieldTextProps,
  RefineFieldUrlProps,
} from "@refinedev/ui-types"
import type { IconBaseProps } from "react-icons"
import type { ConfigType } from "dayjs"
import type { TooltipProps } from "@components/ui/tooltip"
import type { TagProps } from "@components/ui/tag"

export type BooleanFieldProps = RefineFieldBooleanProps<
  unknown,
  Omit<TooltipProps, "label" | "children" | "content">,
  { svgIconProps?: Omit<IconBaseProps, "ref"> }
>

export type DateFieldProps = RefineFieldDateProps<ConfigType, TextProps>

export type EmailFieldProps = RefineFieldEmailProps<ReactNode, LinkProps>

export type FileFieldProps = RefineFieldFileProps<LinkProps>

export type MarkdownFieldProps = RefineFieldMarkdownProps<string | undefined>

export type NumberFieldProps = RefineFieldNumberProps<ReactChild, TextProps>

export type TagFieldProps = RefineFieldTagProps<ReactNode, TagProps>

export type TextFieldProps = RefineFieldTextProps<ReactNode, TextProps>

export type UrlFieldProps = RefineFieldUrlProps<
  string | undefined,
  LinkProps,
  {
    title?: string
  }
>
