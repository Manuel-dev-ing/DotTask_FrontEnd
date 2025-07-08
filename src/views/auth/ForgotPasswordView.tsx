import ErrorMessage from '@/components/ErrorMessage';
import { forgotPassword } from '@/services/AuthAPI';
import type { ForgotPasswordForm } from '@/types/index';
import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {
    email: ''
  }
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });
  
  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
    }
  })

  const handleForgotPassword = (formData: ForgotPasswordForm) => {
    mutate(formData)

  }


  return (
    <>

      <h1 className="text-center text-4xl font-bold text-black font-sans">Reestablece tu Password</h1>
      <p className="text-xl font-normal text-black mt-2 text-center">
        ¿Olvidaste tu password? coloca tu email y reestablece tu password
      </p>  
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="space-y-8 p-10 mt-5 bg-white rounded shadow-lg"
        noValidate
      >
        <div className="flex flex-col gap-3">
          <label
            className="font-normal text-lg font-sans"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-2 border-gray-300 border rounded-md font-sans"
            {...register("email", {
              required: "El Email de registro es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Enviar Instrucciones'
          className="text-white bg-gray-900 hover:bg-gray-950 font-medium rounded-lg px-5 py-2.5 text-center w-full text-lg cursor-pointer font-sans"
        />
      </form>

      <nav className="mt-5 flex flex-col space-y-3">
        <Link to={'/auth/register'} className="text-center text-gray-900 font-normal">¿No tienes Cuenta? Crea una</Link>
        <Link to={'/auth/forgot-password'} className="text-center text-gray-900 font-normal">¿Olvidaste tu contraseña? Restablecer</Link>
      </nav>
    </>
  )
}
