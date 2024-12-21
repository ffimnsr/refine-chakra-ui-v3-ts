import { Create } from "@ffimnsr/refine-chakra-ui-v3"
import { Input, Select, Textarea } from "@chakra-ui/react"
import { useSelect } from "@refinedev/core"
import { useForm } from "@refinedev/react-hook-form"

import type { IPost } from "../../interfaces"
import { Field } from "../../components/ui/field"
import { NativeSelectField, NativeSelectRoot } from "../../components/ui/native-select"

export const PostCreate = () => {
  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<IPost>()

  const { options } = useSelect({
    resource: "categories",
  })

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Field
        mb="3"
        invalid={!!errors?.title}
        errorText={`${errors.title?.message}`}
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
        errorText={`${errors.status?.message}`}
        label="Status"
      >
        <NativeSelectRoot>
          <NativeSelectField
            id="status"
            placeholder="Select Post Status"
            {...register("status", {
              required: "Status is required",
            })}
          >
            <option>published</option>
            <option>draft</option>
            <option>rejected</option>
          </NativeSelectField>
        </NativeSelectRoot>
      </Field>
      <Field
        mb="3"
        invalid={!!errors?.categoryId}
        errorText={`${errors.categoryId?.message}`}
        label="Category"
      >
        <NativeSelectRoot>
          <NativeSelectField
            id="categoryId"
            placeholder="Select Category"
            {...register("category.id", {
              required: "Category is required",
            })}
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
        errorText={`${errors.content?.message}`}
        label="Content"
      >
        <Textarea
          id="content"
          {...register("content", {
            required: "content is required",
          })}
        />
      </Field>
    </Create>
  )
}
