import type { NoteFormData } from "@/types/index"
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"
import { createNote } from "@/services/NoteAPI"

export default function AddNoteForm() {

    const params = useParams()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)

    const projectId = Number(params.ProjectId!)
    const taskId = Number(queryParams.get('viewTask'))

    const initialValues : NoteFormData = {
        contenido: ''
    }

    const { register, handleSubmit, reset, formState: {errors} } = useForm({defaultValues: initialValues })

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Nota creada correctamente")
            queryClient.invalidateQueries({queryKey: ['task', taskId]})

            reset()
        }

    })

    const handleAddNote = (formData: NoteFormData) => {
        mutate({projectId, taskId, formData})
        
    }

  return (
    <form onSubmit={handleSubmit(handleAddNote  )} className="space-y-3" noValidate>
        <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="content">Crear Nota</label>
            <input id="content" type="text" placeholder="Contenido de la nota" 
            className="w-full p-3 border border-gray-400 rounded-md"
                {...register('contenido', {
                    required: 'El contenido de la nota es obligatorio'
                })}
            />
            {errors.contenido && (
                <ErrorMessage>{errors.contenido.message}</ErrorMessage>
            )}
        </div>

        <input type="submit" value='Agregar nota' className="rounded-md bg-gray-900 hover:bg-black w-full p-3 text-white text-lg A font-medium cursor-pointer transition-colors"/>

    </form>
  )
}
