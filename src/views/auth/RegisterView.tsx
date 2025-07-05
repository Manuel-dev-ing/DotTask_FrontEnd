import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import type { UserRegistrationForm } from "@/types/index";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAcount } from "@/services/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
  
  const initialValues: UserRegistrationForm = {
    nombre: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createAcount,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
    }

  })

  const password = watch('password');

  const handleRegister = (formData: UserRegistrationForm) => {
    mutate(formData)

  }

  return (
    <>
      <h1 className="text-center text-4xl font-bold text-black font-sans">Crear Cuenta</h1>
      <p className="text-xl font-normal text-black mt-2 text-center">
        Llena el formulario para crear tu cuenta
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-5 p-10 bg-white mt-5 rounded shadow-lg"
        noValidate
      >
        <div className="flex flex-col gap-2">
          <label
            className="font-normal text-lg font-sans"
            htmlFor="email"
          >Correo Electronico</label>
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

        <div className="flex flex-col gap-2">
          <label
            className="font-normal text-lg font-sans"
          >Nombre</label>
          <input
            type="name"
            placeholder="Nombre de Registro"
            className="w-full p-2 border-gray-300 border rounded-md font-sans"
            {...register("nombre", {
              required: "El Nombre de usuario es obligatorio",
            })}
          />
          {errors.nombre && (
            <ErrorMessage>{errors.nombre.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="font-normal text-lg font-sans"
          >Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-2 border-gray-300 border rounded-md font-sans"
            {...register("password", {
              required: "El Password es obligatorio",
              minLength: {
                value: 8,
                message: 'El Password debe ser mínimo de 8 caracteres'
              }
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="font-normal text-lg font-sans"
          >Repetir Password</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full p-2 border-gray-300 border rounded-md font-sans"
            {...register("password_confirmation", {
              required: "Repetir Password es obligatorio",
              validate: value => value === password || 'Los Passwords no son iguales'
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Registrarme'
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center w-full text-lg cursor-pointer font-sans"
        />
      </form>
        <nav className="mt-10 flex flex-col space-y-3">
          <Link to={'/auth/register'} className="text-center text-gray-600 font-normal">¿No tienes Cuenta? Crea una</Link>
          <Link to={'/auth/forgot-password'} className="text-center text-gray-600 font-normal">¿Olvidaste tu contraseña? Restablecer</Link>
        </nav>
    </>
  )
}