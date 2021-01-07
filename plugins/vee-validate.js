import { extend } from 'vee-validate'
import { email, min, required, min_value } from 'vee-validate/dist/rules'

extend('email', {
  ...email,
  message: '{_field_} must be a valid email',
})

extend('min', {
  ...min,
  message: '{_field_} must be greater than {length} characters',
})

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('min_value', {
  ...min_value,
  message: '{_field_} must be greater than 0',
})
