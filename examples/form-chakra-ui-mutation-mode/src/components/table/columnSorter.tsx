import { IconButton } from "@chakra-ui/react"
import {
  FaSortDown,
  FaSortUp,
  FaSort,
} from "react-icons/fa6"
import type { ColumnButtonProps } from "../../interfaces"
import type { SortDirection } from "@tanstack/react-table"

export const ColumnSorter: React.FC<ColumnButtonProps> = ({ column }) => {
  if (!column.getCanSort()) {
    return null
  }

  const sorted = column.getIsSorted()

  return (
    <IconButton
      aria-label="Sort"
      size="xs"
      onClick={column.getToggleSortingHandler()}
      variant={sorted ? "subtle" : "plain"}
      color={sorted ? "primary" : "gray"}
    >
      <ColumnSorterIcon sorted={sorted} />
    </IconButton>
  )
}

const ColumnSorterIcon = ({ sorted }: { sorted: false | SortDirection }) => {
  if (sorted === "asc") return <FaSortDown size={18} />
  if (sorted === "desc") return <FaSortUp size={18} />
  return <FaSort size={18} />
}
