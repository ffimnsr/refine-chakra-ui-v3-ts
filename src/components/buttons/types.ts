import type { ButtonProps } from "@chakra-ui/react"
import type { UseImportInputPropsType } from "@refinedev/core"
import type {
  RefineCloneButtonProps,
  RefineCreateButtonProps,
  RefineDeleteButtonProps,
  RefineEditButtonProps,
  RefineExportButtonProps,
  RefineImportButtonProps,
  RefineListButtonProps,
  RefineRefreshButtonProps,
  RefineSaveButtonProps,
  RefineShowButtonProps,
} from "@refinedev/ui-types"
import type { IconBaseProps } from "react-icons"

export type ShowButtonProps = Omit<
  RefineShowButtonProps<
    ButtonProps,
    {
      svgIconProps?: Omit<IconBaseProps, "ref">
    }
  >,
  "ignoreAccessControlProvider"
>

export type SaveButtonProps = RefineSaveButtonProps<
  ButtonProps,
  {
    svgIconProps?: Omit<IconBaseProps, "ref">
  }
>

export type RefreshButtonProps = RefineRefreshButtonProps<
  ButtonProps,
  {
    svgIconProps?: Omit<IconBaseProps, "ref">
  }
>

export type ListButtonProps = Omit<
  RefineListButtonProps<
    ButtonProps,
    {
      svgIconProps?: Omit<IconBaseProps, "ref">
    }
  >,
  "ignoreAccessControlProvider"
>

export type ImportButtonProps = RefineImportButtonProps<
  ButtonProps,
  {
    inputProps: UseImportInputPropsType
    svgIconProps?: Omit<IconBaseProps, "ref">
  }
>

export type ExportButtonProps = RefineExportButtonProps<
  ButtonProps,
  {
    svgIconProps?: Omit<IconBaseProps, "ref">
  }
>

export type EditButtonProps = Omit<
  RefineEditButtonProps<
    ButtonProps,
    {
      svgIconProps?: Omit<IconBaseProps, "ref">
    }
  >,
  "ignoreAccessControlProvider"
>

export type DeleteButtonProps = Omit<
  RefineDeleteButtonProps<
    ButtonProps,
    {
      svgIconProps?: Omit<IconBaseProps, "ref">
    }
  >,
  "ignoreAccessControlProvider"
>

export type CloneButtonProps = Omit<
  RefineCloneButtonProps<
    ButtonProps,
    {
      svgIconProps?: Omit<IconBaseProps, "ref">
    }
  >,
  "ignoreAccessControlProvider"
>

export type CreateButtonProps = Omit<
  RefineCreateButtonProps<
    ButtonProps,
    {
      svgIconProps?: Omit<IconBaseProps, "ref">
    }
  >,
  "ignoreAccessControlProvider"
>
