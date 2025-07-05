import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import type { TeamMemberForm } from "@/types/index";
import { findUserByEmail } from "@/services/TeamAPI";
import SerchResult from "./SerchResult";

export default function AddMemberForm() {
    const initialValues: TeamMemberForm = {
        email: ''
    }
    const params = useParams()
    const projectId = Number(params.ProjectId)
    

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const mutation = useMutation({
        mutationFn: findUserByEmail
    })

    const handleSearchUser = async (formData: TeamMemberForm) => {
        const data = {projectId, formData}
        mutation.mutate(data)
        console.log(data);
    }

    const resetData = () => {
        reset(),
        mutation.reset()    
    }

    return (
        <>

            <form
                className="mt-10 space-y-5"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >

                <div className="flex flex-col gap-1">
                    <label
                        className="font-medium text-xl"
                        htmlFor="name"
                    >Correo Electronico del Usuario</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Correo Electronico del usuario a Agregar"
                        className="w-full p-3  border-gray-300 border rounded-md"
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

                <input
                    type="submit"
                    className=" bg-gray-900 hover:bg-black w-full p-3  text-white font-semibold text-xl cursor-pointer"
                    value='Buscar Usuario'
                />
            </form>

            <div className="mt-10">
                {mutation.isPending && <p className="text-center">Cargando...</p> }        
                {mutation.error && <p className="text-center">{mutation.error.message}</p> }    
                {mutation.data && <SerchResult user={mutation.data} reset={resetData} />}    

            </div>       

        </>
    )
}