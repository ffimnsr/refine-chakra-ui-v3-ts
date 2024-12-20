import type { FC } from "react"
import { HStack, Button, Box } from "@chakra-ui/react"
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6"
import { usePagination } from "@refinedev/chakra-ui-v3"

import { IconButton } from "@chakra-ui/react"

type PaginationProps = {
  current: number
  pageCount: number
  setCurrent: (page: number) => void
}

export const Pagination: FC<PaginationProps> = ({
  current,
  pageCount,
  setCurrent,
}) => {
  const pagination = usePagination({
    current,
    pageCount,
  })

  return (
    <Box display="flex" justifyContent="flex-end">
      <HStack my="3" gap="1">
        {pagination?.prev && (
          <IconButton
            aria-label="previous page"
            onClick={() => setCurrent(current - 1)}
            disabled={!pagination?.prev}
            variant="outline"
          >
            <FaChevronLeft size="18" />
          </IconButton>
        )}

        {pagination?.items.map((page) => {
          if (typeof page === "string") return <span key={page}>...</span>

          return (
            <Button
              key={page}
              onClick={() => setCurrent(page)}
              variant={page === current ? "solid" : "outline"}
            >
              {page}
            </Button>
          )
        })}
        {pagination?.next && (
          <IconButton
            aria-label="next page"
            onClick={() => setCurrent(current + 1)}
            variant="outline"
          >
            <FaChevronRight size="18" />
          </IconButton>
        )}
      </HStack>
    </Box>
  )
}
