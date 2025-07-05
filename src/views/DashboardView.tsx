import { getProjects } from "@/services/ProjectAPI";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { isManager } from "@/utils/policies";
import DeleteProjectModal from "@/components/projects/DeleteProjectModal";
import { PlusIcon } from 'lucide-react';

export default function DashboardView() {

    const location  = useLocation()
    const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  })

  if (isLoading) return 'cargando...'

  if(data) return (
    <>
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold font-sans">Mis Proyectos</h1>
                <p className="text-xl font-normal text-gray-900 mt-1">Gestiona y organiza todos tus proyectos</p>
            </div>

            <nav className="my-5">
            <Link className="flex items-center gap-1 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center w-full text-base cursor-pointer font-sans" to='/proyects/create'> <PlusIcon /> Nuevo Proyecto </Link>
            </nav>
        </div>

        {data.length ? (
          <ul role="list" className="grid grid-cols-3 gap-5  mt-10 ">
            {data.map((project) => (
              <li key={project.id} className="rounded-lg bg-white flex shadow-lg justify-between px-5 py-10">
                  <div className="">
                      <div className="min-w-0 flex-auto space-y-2">
                            <div className="mb-2">
                                {isManager(project.is_Manager) ? 
                                    <p className="font-bold text-xs uppercase bg-indigo-50 text-indigo-500 border-2 border-indigo-500 rounded-lg inline-block py-1 px-5">Manager</p>
                                :
                                    <p className="font-bold text-xs uppercase bg-green-50 text-green-500 border-2 border-green-500 rounded-lg inline-block py-1 px-5">Colaborador</p>
                                }
                            </div>  

                          <Link to={`/proyects/${project.id}`}
                              className="text-gray-800 cursor-pointer hover:underline text-xl font-bold"
                          >{project.nombreProyecto}</Link>
                          <p className="text-sm text-gray-600 m-0">
                              Cliente: {project.nombreCliente}
                          </p>
                          <p className="text-sm text-gray-600">
                              {project.descripcion}
                          </p>
                      </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-x-6">
                      <Menu as="div" className="relative flex-none">
                          <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                              <span className="sr-only">opciones</span>
                              <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                          </Menu.Button>
                          <Transition as={Fragment} enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95">
                              <Menu.Items
                                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                              >
                                      <Menu.Item>
                                          <Link to={`/proyects/${project.id}`}
                                              className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                          Ver Proyecto
                                          </Link>
                                      </Menu.Item>

                                      {project.is_Manager === true && (
                                        <>
                                            <Menu.Item>
                                            <Link to={`/proyects/${project.id}/edit`}
                                                className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                            Editar Proyecto
                                            </Link>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <button 
                                                    type='button' 
                                                    className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                    onClick={() => navigate(location.pathname + `?deleteProject=${project.id}`)  }
                                                >
                                                    Eliminar Proyecto
                                                </button>
                                            </Menu.Item>
                                        </>
                                      )}
                                      
                              </Menu.Items>
                          </Transition>
                      </Menu>
                  </div>
              </li>
            ))}
          </ul>

        ) : (
          <p className="text-center py-20">No hay proyectos aun {''}
            <Link to='/proyects/create' className="text-fuchsia-500 font-bold">Crear Proyecto</Link>
          </p>

        )}

        <DeleteProjectModal />
    </>
  )
}
