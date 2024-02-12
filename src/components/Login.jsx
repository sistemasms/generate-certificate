/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form'
import logo from '../assets/logo.png'
import { createRequest } from '../services/serviceAccess'
import { useState } from 'react'
const Login = ({ setUser }) => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (data) => {
    try {
      const response = await createRequest('user_account/login', data)
      console.log(response)
      document.cookie = `data=${JSON.stringify(response)}; domain=medicossalud; path=/; expires=${new Date(Date.now() + 1000 * 60 * 60 * 24)}`

      const cookie = document.cookie.split(';').find(row => row.trim().startsWith('data='))
      const dataCookie = cookie ? JSON.parse(cookie.split('=')[1]) : null

      setUser(dataCookie)
    } catch (error) {
      setErrorMessage('Credencial incorrecta')
      resetField('username')
      resetField('password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col justify-center gap-20 items-center bg-white p-10 rounded-md lg:flex-row shadow-sm'>
          <div className='w-72 md:w-92 mb-5'>
            <img src={logo} alt='logo' />
          </div>
          <div className='w-full lg:w-96'>
            <div className='flex flex-col'>
              <h1 className='text-4xl font-semibold'>Hola,</h1>
              <h1 className='text-4xl font-semibold mb-10'>Bienvenido</h1>
              <input
                placeholder='usuario'
                type='text'
                className='mt-1 mb-5 block w-full px-3 py-2 border border-stone-300 rounded-md text-sm focus:outline-none focus:border-yellow-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none placeholder-slate-400 placeholder:italic'
                {...register('username', {
                  required: true
                })}
              />
              {errors?.username?.type === 'required' && <p className='text-red-500 text-sm'>Este campo es requerido</p>}
              <input
                placeholder='contraseña'
                type='password'
                className='mt-1 mb-5 block w-full px-3 py-2 border border-stone-300 rounded-md text-sm focus:outline-none focus:border-yellow-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none placeholder-slate-400 placeholder:italic'
                {...register('password', {
                  required: true
                })}
              />
              {errors?.password?.type === 'required' && <p className='text-red-500 text-sm'>Este campo es requerido</p>}
              <p className='text-red-500 text-sm pt-2'>{errorMessage}</p>
            </div>
            <button
              type='submit'
              className='flex px-5 py-2 bg-yellow-500 text-stone-800 rounded-md hover:bg-yellow-300'
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </form>
    </div>

  )
}

export default Login
