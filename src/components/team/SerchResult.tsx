import { addUserToProject } from '@/services/TeamAPI'
import type { TeamMember } from '@/types/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

type SerchResultProps = {
    user: TeamMember,
    reset: () => void
}



export default function SerchResult({user, reset}: SerchResultProps) {

    const params = useParams()
    const projectId = Number(params.ProjectId)

    const queryClient = useQueryClient()
    
    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})   

        }

    })

    const handlerAddUserToProject = () => {
        const data = {
            projectId,
            id: user.id
        }

        mutate(data)
    }

    return (
        <>
            <p className='mt-10 text-center font-bold'>Resultado:</p>
            <div className='flex justify-between items-center'>
                <p>{user.nombre}</p>
                <button className='text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer' onClick={handlerAddUserToProject}>Agregar al Proyecto</button>
            </div>
        </>
  
    )
}
