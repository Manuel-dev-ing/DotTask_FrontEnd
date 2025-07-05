import { type FieldErrors, type UseFormRegister } from "react-hook-form"
import type { TaskFormData } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";

type TaskFormProps = {
    errors: FieldErrors<TaskFormData>
    register: UseFormRegister<TaskFormData>
}

export default function TaskForm({errors, register} : TaskFormProps) {
    return (
        <>
            <div className="flex flex-col gap-2">
                <label
                    className="font-medium text-lg"
                    htmlFor="name"
                >Nombre de la tarea</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Ej. Diseñar interfaz de usuario"
                    className="w-full p-3  border-gray-300 border rounded-md"
                    {...register("nombre", {
                        required: "El nombre de la tarea es obligatorio",
                    })}
                />
                {errors.nombre && (
                    <ErrorMessage>{errors.nombre.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className="font-medium text-lg"
                    htmlFor="description"
                >Descripción de la tarea</label>
                <textarea
                    id="description"
                    placeholder="Describe los detalles de la tarea"
                    className="w-full p-3  border-gray-300 border rounded-md"
                    {...register("descripcion", {
                        required: "La descripción de la tarea es obligatoria"
                    })}
                />
                {errors.descripcion && (
                    <ErrorMessage>{errors.descripcion.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}
















