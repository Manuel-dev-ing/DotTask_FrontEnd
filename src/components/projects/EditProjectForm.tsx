import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProjectForm from './ProjectForm'
import type { ProjectFormData } from '@/types/index'
import { useForm } from 'react-hook-form'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProject } from '@/services/ProjectAPI'
import { toast } from 'react-toastify'


type EditProjectFormProps = {
    data: ProjectFormData,
    projectId: string
}

export default function EditProjectForm({data, projectId} : EditProjectFormProps) {

    const navigate = useNavigate()

    const initialValues : ProjectFormData = {
        nombreProyecto: data.nombreProyecto,
        nombreCliente: data.nombreCliente,
        descripcion: data.descripcion
    }
    
    const { register, handleSubmit, formState: {errors} } = useForm({defaultValues: initialValues})

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['projects']})
            queryClient.invalidateQueries({queryKey: ['editProject', projectId]})
            
            toast.success("Proyecto Actualizado")
            navigate('/')
        }

    })


    const handleForm = (formData : ProjectFormData) => {
        const data = {
            formData,
            projectId
        }

        mutate(data)

    }

  return (
    <>
        <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-black">Editar Proyecto</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para editar un proyecto</p>

            <nav className="my-5">
                <Link className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors" to='/' >Volver Proyecto</Link>
            </nav>

            <form className="mt-10 bg-white shadow-lg p-10 rounded-lg" onSubmit={handleSubmit(handleForm)} noValidate>

                <ProjectForm 
                  register={register}
                  errors={errors}
                
                />

              <input type="submit" value="Guardar Cambios" className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors" />
            
            </form>
        </div>
        


    </>
  )
}
