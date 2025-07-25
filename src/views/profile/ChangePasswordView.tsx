import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/ErrorMessage"
import type { UpdateCurrentUserPasswordForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/services/ProfileAPI";
import { toast } from "react-toastify";
import { error } from "console";

export default function ChangePasswordView() {
  const initialValues : UpdateCurrentUserPasswordForm = {
    current_password: '',
    password: '',
    password_confirmation: ''
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: changePassword,
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success("El Password se modifico correctamente")

  })

  const password = watch('password');

  const handleChangePassword = (formData : UpdateCurrentUserPasswordForm) => {
    mutate(formData)
  }

  return (
    <>
      <div className="mx-auto max-w-3xl">

        <h1 className="text-3xl font-semibold ">Cambiar Password</h1>
        <p className="text-2xl font-normal text-gray-700 mt-1">Utiliza este formulario para cambiar tu password</p>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className=" mt-10 space-y-5 bg-white shadow-lg p-10 rounded-lg"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label
              className="text-lg capitalize font-semibold"
              htmlFor="current_password"
            >Password Actual</label>
            <input
              id="current_password"
              type="password"
              placeholder="Password Actual"
              className="w-full p-3 border border-gray-400 rounded-md"
              {...register("current_password", {
                required: "El password actual es obligatorio",
              })}
            />
            {errors.current_password && (
              <ErrorMessage>{errors.current_password.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-5 space-y-3">
            <label
              className="text-lg capitalize font-semibold"
              htmlFor="password"
            >Nuevo Password</label>
            <input
              id="password"
              type="password"
              placeholder="Nuevo Password"
              className="w-full p-3 border border-gray-400 rounded-md"
              {...register("password", {
                required: "El Nuevo Password es obligatorio",
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
          <div className="mb-5 space-y-3">
            <label
              htmlFor="password_confirmation"
              className="text-lg capitalize font-semibold"
            >Repetir Password</label>

            <input
              id="password_confirmation"
              type="password"
              placeholder="Repetir Password"
              className="w-full p-3 border border-gray-400 rounded-md"
              {...register("password_confirmation", {
                required: "Este campo es obligatorio",
                validate: value => value === password || 'Los Passwords no son iguales'
              })}
            />
            {errors.password_confirmation && (
              <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            value='Cambiar Password'
            className="bg-gray-900 w-full p-3 text-white capitalize font-semibold text-lg hover:bg-black cursor-pointer transition-colors rounded"
          />
        </form>
      </div>
    </>
  )
}