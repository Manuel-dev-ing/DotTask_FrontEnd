import api from "@/lib/axios";
import { dashboardProjectSchema, editProjectSchema, projectSchema, type Project, type ProjectFormData } from "../types";
import { isAxiosError } from "axios";


export async function createProject(formData : ProjectFormData) {
    console.log(formData);
    try {

        const { data } = await api.post('/proyectos', formData)     
        console.log(data);
    } catch (error) {

        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
            console.log(error);
        }
    }
}

export async function getProjects() {
    try {
 

        const { data } = await api('/proyectos')     
        const response = dashboardProjectSchema.safeParse(data)

        if (response.success) {
            return response.data
        }

    } catch (error) {

        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
            console.log(error);
        }
    }
}

export async function getProjectById(id : Project['id']) {
    try {
        const { data } = await api(`/proyectos/${id}`)
        const response = editProjectSchema.safeParse(data)
        if (response.success) {
            return response.data
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getFullProject(id : Project['id']) {
    try {
        const { data } = await api(`/proyectos/${id}`)
        const response = projectSchema.safeParse(data)
        
        if (response.success) {
            return response.data
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


type ProjectAPIType = {
    formData : ProjectFormData
    projectId: string
}

export async function updateProject({ formData, projectId }: ProjectAPIType) {
    try {

        await api.put(`/proyectos/${projectId}`, formData)     
        

    } catch (error) {

        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function deleteProject(id : Project['id']) {
    try {

         await api.delete(`/proyectos/${id}`)     

    } catch (error) {

        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
            console.log(error);
        }
    }
}



