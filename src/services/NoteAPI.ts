import { isAxiosError } from "axios";
import type { Note, NoteFormData, Project, Task } from "../types";
import api from "@/lib/axios";

type NoteAPIType = {
    formData: NoteFormData
    projectId: Project['id']
    taskId: Task['id']
    noteId: Note['id']
}

export async function createNote({projectId, taskId, formData} : Pick<NoteAPIType, 'projectId' | 'taskId' |'formData'> ) {
    
    try {
        const url = `/${projectId}/tareas/${taskId}/notas` 
        const { data } = await api.post(url, formData)
        console.log(data);

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }

}

export async function deleteNote({projectId, taskId, noteId} : Pick<NoteAPIType, 'projectId' | 'taskId' | 'noteId'>) {
     try {

        const url = `/${projectId}/tareas/${taskId}/notas/${noteId}` 
        const { data } = await api.delete(url)
        console.log(data);
        return data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
            
        }
    }


}









