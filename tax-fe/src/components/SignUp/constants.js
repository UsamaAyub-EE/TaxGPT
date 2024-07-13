import * as yup from 'yup'

export const SignUpFormSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  password2: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
})
