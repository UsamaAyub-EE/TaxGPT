import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SignUpFormSchema } from './constants'

axios.defaults.baseURL = 'http://localhost:8000'

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SignUpFormSchema)
  })

  const onSubmit = async (data) => {
    console.log('form data', data)
    try {
      const response = await axios.post('/api/auth/register/', data)
      console.log(response.data)
    } catch (error) {
      if (error.response) {
        console.error(error.response.data)
      } else {
        console.error(error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Username</label>
        <input {...register('username')} />
        <p>{errors.username?.message}</p>
      </div>
      <div>
        <label>Email</label>
        <input {...register('email')} />
        <p>{errors.email?.message}</p>
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register('password')} />
        <p>{errors.password?.message}</p>
      </div>
      <div>
        <label>Confirm Password</label>
        <input type="password" {...register('password2')} />
        <p>{errors.password2?.message}</p>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  )
}
