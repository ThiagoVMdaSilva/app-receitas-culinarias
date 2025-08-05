import type { EditLikeById, UpdateLikeInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

type FormLike = NonNullable<EditLikeById['like']>

interface LikeFormProps {
  like?: EditLikeById['like']
  onSave: (data: UpdateLikeInput, id?: FormLike['id']) => void
  error: RWGqlError
  loading: boolean
}

const LikeForm = (props: LikeFormProps) => {
  const onSubmit = (data: FormLike) => {
    props.onSave(data, props?.like?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormLike> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="recipeId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Recipe id
        </Label>

        <NumberField
          name="recipeId"
          defaultValue={props.like?.recipeId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="recipeId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default LikeForm
