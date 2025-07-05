import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { taskSchema, type Project, type Task, type TaskFormData } from "../types";

type TaskAPI = {
    formData: TaskFormData
    projectId: number
    taskId: Task['id']
    status: Task['estado']
}

export async function createTask({formData, projectId} : Pick<TaskAPI, 'formData' | 'projectId'>) {
    console.log(formData);
    try {
        const url = `/proyectos/${projectId}/tareas`
        const data = await api.post(url, formData)
        console.log(data);
        
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response ) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getTaskById({projectId, taskId} : Pick<TaskAPI, 'projectId' | 'taskId'>) {
    try {
        
        
        const url = `https://localhost:7146/api/proyectos/${projectId}/tareas/${taskId}`
        // console.log(url);
        
        const {data} = await api(url)
        // console.log(data);

        const response = taskSchema.safeParse(data)
        

        if (response.success) {
            
            return response.data
        }


    } catch (error) {
        if (isAxiosError(error) && error.response ) {
            throw new Error(error.response.data)
        }
    }
}


export async function updateTask({projectId, taskId, formData} : Pick<TaskAPI, 'projectId' | 'taskId' | 'formData'>) {
    try {
        const url = `https://localhost:7146/api/proyectos/${projectId}/tareas/${taskId}`
        const {data} = await api.put(url, formData)
        console.log(data);
        
        
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response ) {
            throw new Error(error.response.data)
        }
    }
}

export async function deleteTask({projectId, taskId} : Pick<TaskAPI, 'projectId' | 'taskId'>) {
    try {
        const url = `https://localhost:7146/api/proyectos/${projectId}/tareas/${taskId}`
        const response = await api.delete(url)
        console.log(response);

        return response.data

    } catch (error) {
        if (isAxiosError(error) && error.response?.data.error ) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateStatus({projectId, taskId, status} : Pick<TaskAPI, 'projectId' | 'taskId' | 'status' >) {

    try {
        const url = `/proyectos/${projectId}/tareas/${taskId}/status`
        console.log(url);
        
        const data = await api.put(url, {status})
        console.log(data);
        
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response ) {
            throw new Error(error.response.data.error)
        }
    }
}



