import AddMemberModal from '@/components/team/AddMemberModal';
import { getProjectTeam, removeUserFromProject } from '@/services/TeamAPI';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, PlusIcon } from 'lucide-react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Fragment } from 'react/jsx-runtime';

export default function ProjectTeamView() {

  const navigate = useNavigate()
  const params = useParams()
  const projectId = Number(params.ProjectId)

  const queryClient = useQueryClient()
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['projectTeam', projectId],
    queryFn: () => getProjectTeam(projectId),
    retry: false
  })

  const { mutate } = useMutation({
    mutationFn: removeUserFromProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success("Usuario eliminado correctamente")
      queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})   
    }

  })

  if (isLoading) return 'Cargando...'
  if (isError) return <Navigate to={'/404'} />

  if(data) return (
    <>
        <h1 className='text-4xl font-bold'>Administrar Equipo</h1>
        <p className='text-2xl font-normal text-gray-600 mt-2'>Administra el equipo de trabajo para este proyecto</p>

        <nav className='my-5 flex gap-3'>
            <button type='button' className='flex items-center justify-center gap-1 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-3 text-xl cursor-pointer font-sans' onClick={() => navigate(location.pathname + '?addMember=true')}><PlusIcon /> Agregar Colaborador</button>

            <Link to={`/proyects/${projectId}`}
                className='flex items-center justify-center gap-1 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-3 text-xl cursor-pointer font-sans'
            ><ArrowLeft /> Volver al Proyecto</Link>

        </nav>

          <h2 className="text-4xl font-bold my-10">Miembros actuales</h2>
          {data.length ? (
              <ul role="list" className="divide-y divide-gray-100 border border-gray-100 bg-white shadow-lg">
                  {data?.map((member) => (
                      <li key={member.id} className="flex justify-between gap-x-6 px-5 py-10">
                          <div className="flex min-w-0 gap-x-4">
                              <div className="min-w-0 flex-auto space-y-2">
                                    <p className="text-2xl font-bold text-gray-800">
                                        {member.nombre}
                                    </p>
                                    <p className="text-md text-gray-800">
                                        {member.email}
                                    </p>
                              </div>
                          </div>
                          <div className="flex shrink-0 items-center gap-x-6">
                              <Menu as="div" className="relative flex-none">
                                  <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                          <span className="sr-only">opciones</span>
                                          <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                                  </Menu.Button>
                                  <Transition
                                      as={Fragment}
                                      enter="transition ease-out duration-100"
                                      enterFrom="transform opacity-0 scale-95"
                                      enterTo="transform opacity-100 scale-100"
                                      leave="transition ease-in duration-75"
                                      leaveFrom="transform opacity-100 scale-100"
                                      leaveTo="transform opacity-0 scale-95"
                                  >
                                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                          <Menu.Item>
                                              <button
                                                  type='button'
                                                  className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                  onClick={() => mutate({projectId, userId: member.id})}
                                              >
                                                  Eliminar del Proyecto
                                              </button>
                                          </Menu.Item>
                                      </Menu.Items>
                                  </Transition>
                              </Menu>
                          </div>
                      </li>
                  ))}
              </ul>
          ) : (
              <p className='text-center py-20'>No hay miembros en este equipo</p>
          )}
        <AddMemberModal/>
    </>
  )
}
