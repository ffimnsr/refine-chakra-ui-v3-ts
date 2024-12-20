import React from "react"
import { useTable } from "@refinedev/react-table"
import { type ColumnDef, flexRender } from "@tanstack/react-table"
import { type GetManyResponse, useMany } from "@refinedev/core"
import {
  List,
  ShowButton,
  EditButton,
  DeleteButton,
  DateField,
} from "@ffimnsr/refine-chakra-ui-v3"

import { Table, HStack, Text, Select, Container } from "@chakra-ui/react"

import { ColumnFilter, ColumnSorter } from "../../components/table"
import { Pagination } from "../../components/pagination"
import type { FilterElementProps, ICategory, IPost } from "../../interfaces"
import {
  NativeSelectField,
  NativeSelectRoot,
} from "../../components/ui/native-select"

export const PostList: React.FC = () => {
  const columns = React.useMemo<ColumnDef<IPost>[]>(
    () => [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
        enableColumnFilter: false,
      },
      {
        id: "title",
        header: "Title",
        accessorKey: "title",
        meta: {
          filterOperator: "contains",
        },
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        meta: {
          filterElement: function render(props: FilterElementProps) {
            return (
              <NativeSelectRoot size="sm">
                <NativeSelectField
                  borderRadius="md"
                  {...props}
                  placeholder="Select Post Status"
                >
                  <option value="published">published</option>
                  <option value="draft">draft</option>
                  <option value="rejected">rejected</option>
                </NativeSelectField>
              </NativeSelectRoot>
            )
          },
          filterOperator: "eq",
        },
      },
      {
        id: "category.id",
        header: "Category",
        enableColumnFilter: false,
        accessorKey: "category.id",
        cell: function render({ getValue, table }) {
          const meta = table.options.meta as {
            categoriesData: GetManyResponse<ICategory>
          }
          const category = meta.categoriesData?.data.find(
            (item) => item.id === getValue(),
          )
          return category?.title ?? "Loading..."
        },
      },
      {
        id: "createdAt",
        header: "Created At",
        accessorKey: "createdAt",
        cell: function render({ getValue }) {
          return <DateField value={getValue() as string} format="LLL" />
        },
        enableColumnFilter: false,
      },
      {
        id: "actions",
        header: "Actions",
        accessorKey: "id",
        enableColumnFilter: false,
        enableSorting: false,
        cell: function render({ getValue }) {
          return (
            <HStack>
              <ShowButton
                hideText
                size="sm"
                recordItemId={getValue() as number}
              />
              <EditButton
                hideText
                size="sm"
                recordItemId={getValue() as number}
              />
              <DeleteButton
                hideText
                size="sm"
                recordItemId={getValue() as number}
              />
            </HStack>
          )
        },
      },
    ],
    [],
  )

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      setCurrent,
      pageCount,
      current,
      tableQuery: { data: tableData },
    },
  } = useTable({
    columns,
    refineCoreProps: {
      initialSorter: [
        {
          field: "id",
          order: "desc",
        },
      ],
    },
  })

  const categoryIds = tableData?.data?.map((item) => item.category.id) ?? []
  const { data: categoriesData } = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  })

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
      categoriesData,
    },
  }))

  return (
    <List>
      <Container whiteSpace="pre-line">
        <Table.Root variant="line">
          <Table.Header>
            {getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.ColumnHeader key={header.id}>
                    {!header.isPlaceholder && (
                      <HStack gap="2">
                        <Text>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </Text>
                        <HStack gap="2">
                          <ColumnSorter column={header.column} />
                          <ColumnFilter column={header.column} />
                        </HStack>
                      </HStack>
                    )}
                  </Table.ColumnHeader>
                ))}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body>
            {getRowModel().rows.map((row) => (
              <Table.Row key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Container>
      <Pagination
        current={current}
        pageCount={pageCount}
        setCurrent={setCurrent}
      />
    </List>
  )
}
