import { useEffect } from "react"
import { Edit } from "@ffimnsr/refine-chakra-ui-v3"
import { Input, Select, Textarea } from "@chakra-ui/react"
import { useSelect } from "@refinedev/core"
import { useForm } from "@refinedev/react-hook-form"

import type { IPost } from "../../interfaces"
import {
  NativeSelectField,
  NativeSelectRoot,
} from "../../components/ui/native-select"
import { Field } from "../../components/ui/field"

export const PostEdit = () => {
  const {
    refineCore: { formLoading, query: queryResult, autoSaveProps },
    saveButtonProps,
    register,
    formState: { errors },
    setValue,
  } = useForm<IPost>({
    refineCoreProps: {
      autoSave: {
        enabled: true,
      },
    },
  })

  const { options } = useSelect({
    resource: "categories",

    defaultValue: queryResult?.data?.data.category.id,
    queryOptions: { enabled: !!queryResult?.data?.data.category.id },
  })

  useEffect(() => {
    setValue("category.id", queryResult?.data?.data?.category?.id || 1)
  }, [options])

  return (
    <Edit
      isLoading={formLoading}
      saveButtonProps={saveButtonProps}
      autoSaveProps={autoSaveProps}
    >
      <Field
        mb="3"
        invalid={!!errors?.title}
        errorText={`${errors?.title?.message}`}
        label="Title"
      >
        <Input
          id="title"
          type="text"
          {...register("title", { required: "Title is required" })}
        />
      </Field>
      <Field
        mb="3"
        invalid={!!errors?.status}
        errorText={`${errors?.status?.message}`}
        label="Status"
      >
        <NativeSelectRoot size="sm">
          <NativeSelectField
            borderRadius="md"
            id="status"
            {...register("status", {
              required: "Status is required",
            })}
            placeholder="Select Post Status"
          >
            <option value="published">published</option>
            <option value="draft">draft</option>
            <option value="rejected">rejected</option>
          </NativeSelectField>
        </NativeSelectRoot>
      </Field>
      <Field
        mb="3"
        invalid={!!errors?.categoryId}
        errorText={`${errors?.categoryId?.message}`}
        label="Category"
      >
        <NativeSelectRoot size="sm">
          <NativeSelectField
            borderRadius="md"
            id="categoryId"
            {...register("category.id", {
              required: true,
            })}
            placeholder="Select Category"
          >
            {options?.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </NativeSelectField>
        </NativeSelectRoot>
      </Field>

      <Field
        mb="3"
        invalid={!!errors?.content}
        errorText={`${errors?.content?.message}`}
        label="Content"
      >
        <Textarea
          id="content"
          {...register("content", {
            required: "content is required",
          })}
        />
      </Field>
    </Edit>
  )
}
