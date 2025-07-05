import { useAuth } from "@/hooks/useAuth"
import { deleteNote } from "@/services/NoteAPI"
import type { Note } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type NoteDetailProps = {
    note: Note
}

export default function NoteDetail({ note } : NoteDetailProps) {
    

    const { data, isLoading } = useAuth()
    const canDelete = useMemo(() => data?.id === note.notaCreadoPor.id, [data])

    // Obtener projectId
    const params = useParams()
    const projectId = Number(params.ProjectId!)
    
    //obtener task id
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = Number(queryParams.get('viewTask'))

    const queryClient = useQueryClient()
    
    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => toast.error(error.message),
        onSuccess: () => {
            toast.success("Nota eliminada correctamente")
            queryClient.invalidateQueries({queryKey: ['task', taskId]})

        }
    })

    if (isLoading) return 'Cargando...'

    return (
        <div className="p-3 flex justify-between items-start">
            <p className="flex flex-col text-mormal text-lg">{note.contenido} <span className="font-semibold">{note.notaCreadoPor.nombre}</span></p>


            {canDelete && (
                <button type="button" className="rounded bg-red-500 hover:bg-red-600 p-2 text-xs text-white font-bold cursor-pointer transition-colors"
                onClick={() => mutate({projectId, taskId, noteId: note.id})}
                >Eliminar</button>
            )}        

        </div>

    )


}
