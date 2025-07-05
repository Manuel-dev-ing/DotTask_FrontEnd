import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import type { User, UserProfileForm } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "@/services/ProfileAPI"
import { toast } from "react-toastify"

type ProfileFormProps = {
    data: User
}

export default function ProfileForm({ data }: ProfileFormProps) {

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: data })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => toast.error(error.message),
        onSuccess: () => {
            toast.success("Perfil actualizado correctamente")
            queryClient.invalidateQueries({queryKey: ["user"]})
        }   

    })

    const handleEditProfile = (formData: UserProfileForm) => {
        mutate(formData)
    }

    return (
        <>
            <div className="mx-auto max-w-3xl">
                <h1 className="text-5xl font-semibold ">Mi Perfil</h1>
                <p className="text-2xl font-normal text-gray-600 mt-1">Aquí puedes actualizar tu información</p>

                <form
                    onSubmit={handleSubmit(handleEditProfile)}
                    className="mt-8 space-y-5 bg-white shadow-lg p-10 rounded-lg"
                    noValidate
                >
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-lg capitalize font-semibold"
                            htmlFor="name"
                        >Nombre</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Tu Nombre"
                            className="w-full p-3 border border-gray-400 rounded-md"
                            {...register("nombre", {
                                required: "Nombre de usuario es obligatoro",
                            })}
                        />
                        {errors.nombre && (
                            <ErrorMessage>{errors.nombre.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="mb-5 space-y-3">
                        <label
                            className="text-lg capitalize font-semibold"
                            htmlFor="password"
                        >Correo Electronico</label>
                        <input
                            id="text"
                            type="email"
                            placeholder="Tu Email"
                            className="w-full p-3 border border-gray-400 rounded-md"
                            {...register("email", {
                                required: "EL e-mail es obligatorio",
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
                        value='Guardar Cambios'
                        className="bg-gray-900 w-full p-3 text-white capitalize text-lg font-semibold hover:bg-black cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    )
}