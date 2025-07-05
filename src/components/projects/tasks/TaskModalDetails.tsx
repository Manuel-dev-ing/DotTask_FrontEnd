import React, { Fragment, use } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateStatus } from '@/services/TaskAPI';
import { toast } from 'react-toastify';
import { statusTranlations } from '@/locales/es';
import { updateProject } from '@/services/ProjectAPI';
import { toNamespacedPath } from 'path/posix';
import type { TaskStatus } from '@/types/index';
import NotesPanel from '@/components/notes/NotesPanel';
import { History } from 'lucide-react';



const statusbadgesStyles : { [key: string] : string } = {
    pending: 'bg-slate-100',
    onHold: 'bg-red-100',
    inProgress: 'bg-blue-100',
    underReview: 'bg-amber-100',
    Completado: 'bg-emerald-100'
}

const statusTextStyles : { [key: string] : string } = {
    pending: 'text-slate-800',
    onHold: 'text-red-800',
    inProgress: 'text-blue-800',
    underReview: 'text-amber-800',
    Completado: 'text-emerald-800'
}

export default function TaskModalDetails() {
    // Obtener projectId
    const params = useParams()
    const projectId = Number(params.ProjectId!)

    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = Number(queryParams.get('viewTask'))
    console.log(taskId);
    
    const show = taskId ? true : false
    
    const {data, isError, error} = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        enabled: !!taskId,
        retry: false
    })

    if (isError) {
        toast.error(error.message, { toastId: 'error'})
        
        return <Navigate to={`/proyects/${projectId}`} />
    }
    
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success("Actualizado correctamente")
            queryClient.invalidateQueries({queryKey: ['editProject', projectId]})
            queryClient.invalidateQueries({queryKey: ['task', taskId]})

            navigate(location.pathname, {replace: true})

        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as TaskStatus

        const data = { projectId, taskId, status }
        mutate(data)

    }

    console.log(data);
    

    if(data) return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true})}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                           
                                    <Dialog.Title
                                        as="h3"
                                        className="font-semibold text-2xl text-black my-2"
                                    >{data.nombre}
                                    </Dialog.Title>
                                    <p className='font-semibold text-xl text-black my-2 mt-3'>Descripción</p>
                                    <p className='font-normal text-xl text-gray-700 mt-3'>{data.descripcion}</p>

                                    <div className='rounded-md border border-gray-300 p-7 mt-4'>
                                        {data.historialCambiosTareas.length ? (
                                            <>
                                                <p className='font-semibold text-xl text-black flex gap-2 items-center'><History /> Historial de cambios ({data.historialCambiosTareas.length})</p>

                                                <ul className='mt-4'>
                                                    {data.historialCambiosTareas.map( (item) => (
                                                        <li className='my-5 flex items-center gap-1' key={item.id}>
                                                            <span className={`pl-3 pr-3 pt-1 pb-1 rounded-2xl font-semibold text-black text-sm ${statusTextStyles[item.status]}  ${statusbadgesStyles[item.status]}`}>{ item.status}</span>{' '}<span className='text-gray-600'>por {item.nombreUsuario}</span> 
                                                        </li>
                                                    ))}

                                                </ul>
                                            </>
                                        ): null }  
                                    </div>
                                  
                                    <div className='my-5 space-y-3'>
                                        <label className='font-semibold'>Estado Actual:</label>
                                        <select className='w-full p-3 bg-white border border-gray-400 rounded-md' defaultValue={data.estado} onChange={handleChange}>
                                            
                                            {Object.entries(statusTranlations).map(([key, value]) => (
                                                <option key={key} value={key}>{value}</option>
                                            ))}

                                        </select>
                                    </div>

                                    <NotesPanel notes={data.notas} />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}