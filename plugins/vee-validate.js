import { extend } from 'vee-validate'
import { email, min, required, min_value, regex } from 'vee-validate/dist/rules'

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
  message: '{_field_} cannot be empty',
})

extend('regex', {
  ...regex,
  message: '{_field_} must be a number',
})

extend('min_value', {
  ...min_value,
  message: '{_field_} must be greater than 0',
})

extend('url', {
  validate(value) {
    var pattern = new RegExp(
      '^(?:\\\\)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\\\d+)?(\\[-a-z\\d%_.~+]*)*', // port and path
      'i'
    ) // fragment locator
    return pattern.test(value)
  },
  message: 'Please enter a valid link without protocol.',
})
