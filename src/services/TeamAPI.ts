import { isAxiosError } from "axios";
import { teamMembersSchema, type Project, type TeamMember, type TeamMemberForm } from "../types";
import api from "@/lib/axios";

export async function findUserByEmail({projectId, formData} : {projectId: Project['id'], formData: TeamMemberForm}) {
    try {
        const url = `/proyectos/${projectId}/team/buscar`
        const { data } = await api.post(url, formData)
        console.log(data);
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response ) {
            throw new Error(error.response.data)
        }
    }
}

export async function addUserToProject({projectId, id} : {projectId: Project['id'], id: TeamMember['id']}) {
    try {
        const url = `/proyectos/${projectId}/team`

        const { data } = await api.post(url, {id})
        console.log(data);
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response ) {
            throw new Error(error.response.data)
        }
    }
}

export async function removeUserFromProject({projectId, userId} : {projectId: Project['id'], userId: TeamMember['id']}) {
    try {
        const url = `/proyectos/${projectId}/team/${userId}`

        const { data } = await api.delete(url)
        console.log(data);
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response ) {
            throw new Error(error.response.data)
        }
    }
}


export async function getProjectTeam(projectId: Project['id']) {
    try {
        const url = `/proyectos/${projectId}/team`

        const { data } = await api(url)
        const response = teamMembersSchema.safeParse(data)
        if (response.success) {
            return response.data
        }

    } catch (error) {
        if (isAxiosError(error) && error.response ) {
            throw new Error(error.response.data)
        }
    }
}







