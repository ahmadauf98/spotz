import { extend } from 'vee-validate'
import { email, min } from 'vee-validate/dist/rules'

extend('email', {
  ...email,
  message: '{_field_} must be a valid email',
})

extend('min', {
  ...min,
  message: '{_field_} must be greater than {length} characters',
})
