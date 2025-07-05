import type { Project, Task, taskProject } from '@/types/index'
import React from 'react'
import TaskCard from './TaskCard'
import { statusTranlations } from '@/locales/es'
import DropTask from './DropTask'
import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateStatus } from '@/services/TaskAPI'
import { toast } from 'react-toastify'
import { useLocation, useParams } from 'react-router-dom'

type TaskListProps = {
    tasks: taskProject[]
    canEdit: boolean
}

type GroupedTasks = {
    [key: string]: taskProject[]
}

const initialStatusGroups : GroupedTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: []
}

const statusStyles : { [key: string] : string } = {
    pending: 'border-t-slate-500',
    onHold: 'border-t-red-500',
    inProgress: 'border-t-blue-500',
    underReview: 'border-t-amber-500',
    completed: 'border-t-emerald-500'
}


export default function TaskList({ tasks, canEdit }: TaskListProps) {
    // Obtener projectId

    console.log(tasks);
    
    const params = useParams()
    const projectId = Number(params.ProjectId!)

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success("Actualizado correctamente")
            queryClient.invalidateQueries({queryKey: ['editProject', projectId.toString()]})
            // queryClient.invalidateQueries({queryKey: ['task', taskId]})

            // navigate(location.pathname, {replace: true})
        }
    })

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.estado] ? [...acc[task.estado]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.estado]: currentGroup };
    }, initialStatusGroups);
    
    const handleDragEnd = (e: DragEndEvent) => {
        const { over, active } = e
        
        if (over && over.id) {
            const taskId = Number(active.id)
            const status = over.id.toString()
            console.log(status);
            
            mutate({projectId, taskId, status})

            queryClient.setQueryData(['editProject', projectId], (prevData: Project) => {
                const updateTask = prevData.tareas.map((task) => {
                    if (task.id === taskId) {
                        return {
                            ...task,
                            status
                        }
                    }
                    return task
                })

                return {
                    ...prevData,
                    tasks: updateTask
                }
            })
        }

    }

  return (
    <>
        <h2 className="text-5xl font-black my-10">Tareas</h2>

        <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
            <DndContext onDragEnd={handleDragEnd}>
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                        <h3 
                        className={`capitalize text-xl font-normal border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]}`}>{statusTranlations[status]}</h3>
                        <DropTask status={status} />

                        <ul className='mt-5 space-y-5'>
                            {tasks.length === 0 ? (
                                <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                            ) : (
                                tasks.map(task => <TaskCard key={task.id} task={task} canEdit={canEdit} />)
                            )}
                        </ul>
                    </div>
                ))}

            </DndContext>
        </div>
    </>
  )
}
