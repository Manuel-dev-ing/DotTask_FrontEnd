import EditProjectForm from '@/components/projects/EditProjectForm'
import { getProjectById } from '@/services/ProjectAPI'
import { useQuery } from '@tanstack/react-query'
import { log } from 'console'
import React from 'react'
import { Navigate, useParams } from 'react-router-dom'

export default function EditProjectView() {

    const params = useParams()
    const projectId = params.ProjectId!
    
    const { data, isLoading, error, isError } = useQuery({
        
        queryKey: ['editProject', projectId],
        queryFn: () => getProjectById( Number(projectId)),
        retry: false
    })

    if (isLoading) return 'Cargando...'

    if (isError) return <Navigate to='/404' />

    if (data) return <EditProjectForm data={data} projectId={projectId} />
}

