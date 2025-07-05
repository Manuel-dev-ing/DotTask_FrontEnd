import ProjectForm from "@/components/projects/ProjectForm";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { ProjectFormData } from "@/types/index";
import { createProject } from "@/services/ProjectAPI";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";


export default function CreateProyectView() {

  const navigate = useNavigate();

  const initialValues : ProjectFormData = {
    nombreProyecto: "",
    nombreCliente: "",
    descripcion: ""
  }

  const { register, handleSubmit, formState: {errors} } = useForm({defaultValues: initialValues})

  const mutation = useMutation({
    mutationFn: createProject,
    onError: (error)=>{
      toast.error(error.message);
      

    },
    onSuccess: ()=>{
      toast.success("Proyecto Creado Correctamente")
      navigate('/')

    }

  })

  const handleForm = async (data : ProjectFormData) => {
    await mutation.mutateAsync(data)

  }

  return (
    <>
        <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-semibold">Crear Proyecto</h1>
            <p className="text-2xl font-normal text-gray-600 mt-1">Llena el siguiente formulario para crear un proyecto</p>

            <nav className="my-5">
                <Link className="w-60 flex items-center justify-center gap-1 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-3 text-xl cursor-pointer font-sans" to='/'><ArrowLeft />Volver Proyecto</Link>
            </nav>

            <form className="mt-10 bg-white shadow-lg p-10 rounded-lg" onSubmit={handleSubmit(handleForm)} noValidate>

                <ProjectForm 
                  register={register}
                  errors={errors}
                
                />

              <input type="submit" value="Crear Proyecto" className="bg-gray-900 hover:bg-black w-full p-3 text-white capitalize text-lg font-semibold cursor-pointer transition-colors rounded" />
            
            </form>
        </div>
        


    </>
  )
}
