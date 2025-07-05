import { getTaskById } from '@/services/TaskAPI';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import EditTaskModal from './EditTaskModal';

export default function EditTaskData() {
  const params = useParams();
  const projectId = params.ProjectId!

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const taskId = Number(queryParams.get('editTask')!)

  const {data, isError} = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById({projectId, taskId}),
    enabled: !!taskId,
    retry: false
  })

  
  if (isError) return <Navigate to={'/404'} />

  if (data) return <EditTaskModal data={data} taskId={taskId} /> 
  
}
