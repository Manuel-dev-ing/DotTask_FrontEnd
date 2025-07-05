import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import type { UserLoginForm } from "@/types/index";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "@/services/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
  const navigate = useNavigate()
  
  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {

      navigate('/')
      console.log("iniciando sesion");

    }

  }) 

  const handleLogin = (formData: UserLoginForm) => { 
    mutate(formData)

  }

  return (
    <>
      <h1 className="text-5xl font-medium text-black font-sans text-center m-0">DotTask</h1>

      <p className="text-lg font-normal text-gray-900 font-sans text-center mt-1">
        Gestión inteligente de proyectos y tareas
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-5 mt-6 bg-white shadow-lg rounded-md"
        noValidate
      >
        <h1 className="text-3xl font-medium text-black text-center m-0">Iniciar Sesion</h1>
        <p className="font-sans text-base text-slate-600 text-center mb-5">Ingresa tus credenciales para acceder</p>
        <div className="flex flex-col gap-3">
          <label
            className="font-normal text-lg font-sans"
          >Correo Electronico</label>

          <input
            id="email"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            className="w-full p-2 border-gray-400 border rounded-md font-sans"
            {...register("email", {
              required: "El Email es obligatorio",
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

        <div className="flex flex-col gap-3">
          <label
            className="font-normal text-lg font-sans"
          >Password</label>

          <input
            type="password"
            placeholder="********"
            className="w-full p-2  border-gray-400 border rounded-md font-sans"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Iniciar Sesión'
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