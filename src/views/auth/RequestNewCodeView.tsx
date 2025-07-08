import ErrorMessage from '@/components/ErrorMessage';
import { RequestConfirmationCode } from '@/services/AuthAPI';
import type { RequestConfirmationCodeForm } from '@/types/index';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function RequestNewCodeView() {
   const initialValues: RequestConfirmationCodeForm = {
        email: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: RequestConfirmationCode,
        onError: (error) => {
            toast.error("El usuario ya esta confirmado")
        },
        onSuccess: (data) => {
            toast.success(data)
        }

    });



    const handleRequestCode = (formData: RequestConfirmationCodeForm) => {

        mutate(formData)
    
    }

    return (
        <>
            <h1 className="text-3xl font-semibold text-black">Solicitar Código de Confirmación</h1>
            <p className="text-xl font-normal text-black mt-1">
                Coloca tu e-mail para recibir un nuevo código
            </p>

            <form
                onSubmit={handleSubmit(handleRequestCode)}
                className="space-y-8 p-10 rounded-lg bg-white mt-10 shadow-lg"
                noValidate
            >
                <div className="flex flex-col gap-2">
                    <label
                        className="font-normal text-xl"
                        htmlFor="email"
                    >Correo Electronico</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full p-3 rounded-lg border-gray-400 border"
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
                    value='Enviar Código'
                    className="bg-gray-900 hover:bg-black w-full p-3 rounded-lg text-white font-semibold text-xl cursor-pointer"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/login'
                    className="text-center text-gray-900 font-normal"
                >
                    ¿Ya tienes cuenta? Iniciar Sesión
                </Link>
                <Link
                    to='/auth/forgot-password'
                    className="text-center text-gray-900 font-normal"
                >
                    ¿Olvidaste tu contraseña? Reestablecer
                </Link>
            </nav>
        </>
    )

}
