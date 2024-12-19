import React from "react"

import type { TagFieldProps } from "../types"
import { Tag } from "@components/ui/tag"

/**
 * This field lets you display a value in a tag. It uses Chakra UI {@link https://chakra-ui.com/docs/components/tag `<Tag>`} component.
 *
 * @see {@link https://refine.dev/docs/api-reference/chakra-ui/components/fields/tag} for more details.
 */
export const TagField: React.FC<TagFieldProps> = ({ value, ...rest }) => {
  return <Tag {...rest}>{value?.toString()}</Tag>
}
