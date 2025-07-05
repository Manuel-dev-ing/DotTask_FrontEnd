import AddTaskModal from '@/components/projects/tasks/AddTaskModal'
import EditTaskData from '@/components/projects/tasks/EditTaskData'
import TaskList from '@/components/projects/tasks/TaskList'
import TaskModalDetails from '@/components/projects/tasks/TaskModalDetails'
import { useAuth } from '@/hooks/useAuth'
import { getFullProject } from '@/services/ProjectAPI'
import { isManager } from '@/utils/policies'
import { useQuery } from '@tanstack/react-query'
import { PlusIcon, Users } from 'lucide-react'
import { useMemo } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

export default function ProjectDetailView() {

    const { data: user, isLoading: authLoading} = useAuth()
    const navigate = useNavigate()

    const params = useParams()
    const projectId = Number(params.ProjectId)!
    
    const { data, isLoading, error, isError } = useQuery({
        
        queryKey: ['editProject', projectId],
        queryFn: () => getFullProject(projectId),
        retry: false
    })

    const canEdit = useMemo(() => user?.rol === 'manager' ,[user])

    if (isLoading && authLoading) return 'Cargando...'

    if (isError) return <Navigate to='/404' />

    if (data && user) return (
        <>
            <h1 className='text-5xl font-bold'>{data.nombreProyecto}</h1>
            <p className='text-2xl font-normal font-sans text-gray-600 mt-2'>{data.descripcion}</p>
            
            {isManager(data.is_Manager) && (
                <nav className='my-5 flex gap-3'>
                    <button type='button' className='flex items-center justify-center gap-1 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-3 w-60 text-xl cursor-pointer font-sans' onClick={() => navigate(location.pathname + '?newTask=true')}> <PlusIcon /> Agregar Tarea</button>

                    <Link to={'team'}
                        className='flex items-center justify-center gap-1 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-3 w-60 text-xl cursor-pointer font-sans'
                    ><Users /> Colaboradores</Link>
                </nav>
            )}
            <TaskList tasks={data.tareas} canEdit={canEdit} />
            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetails />
        </>
    )
}
