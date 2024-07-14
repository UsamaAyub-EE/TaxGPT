import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const schema = yup.object().shape({
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters')
})

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  const router = useRouter()

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login/', data)
      localStorage.setItem('token', response.data.token)
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <button type="submit">Sign In</button>
    </form>
  )
}
