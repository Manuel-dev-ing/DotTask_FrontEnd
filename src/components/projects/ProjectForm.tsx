import type { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import type { ProjectFormData } from "types";


type ProjectFormProps = {
    register:  UseFormRegister<ProjectFormData>

    errors: FieldErrors<ProjectFormData>

}


export default function ProjectForm({register, errors} : ProjectFormProps) {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="NombreProyecto" className="text-lg capitalize font-semibold">
                    Nombre del Proyecto
                </label>
                <input
                    id="NombreProyecto"
                    className="w-full p-3 border border-gray-400 rounded-md"
                    type="text"
                    placeholder="Nombre del Proyecto"
                    {...register("nombreProyecto", {
                        required: "El Titulo del Proyecto es obligatorio",
                    })}
                />

                {errors.nombreProyecto && (
                    <ErrorMessage>{errors.nombreProyecto.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="NombreCliente" className="text-lg capitalize font-semibold">
                    Nombre Cliente
                </label>
                <input
                    id="NombreCliente"
                    className="w-full p-3 border border-gray-400 rounded-md"
                    type="text"
                    placeholder="Nombre del Cliente"
                    {...register("nombreCliente", {
                        required: "El Nombre del Cliente es obligatorio",
                    })}
                />

                {errors.nombreCliente && (
                    <ErrorMessage>{errors.nombreCliente.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="Descripcion" className="text-lg capitalize font-semibold">
                    Descripción
                </label>
                <textarea
                    id="Descripcion"
                    className="w-full p-3  border border-gray-400 rounded-md"
                    placeholder="Descripción del Proyecto"
                    {...register("descripcion", {
                        required: "Una descripción del proyecto es obligatoria"
                    })}
                />

                {errors.descripcion && (
                    <ErrorMessage>{errors.descripcion.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}