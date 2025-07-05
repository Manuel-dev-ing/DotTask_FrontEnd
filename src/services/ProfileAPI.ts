import api from "@/lib/axios";
import { isAxiosError } from "axios";
import type { UpdateCurrentUserPasswordForm, UserProfileForm } from "../types";

export async function updateProfile(formData: UserProfileForm) {
    try {
        const { data } = await api.put('/usuarios/actualizar-perfil', formData)     
        console.log(data);

        return data

    } catch (error) {

        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
    }
}

export async function changePassword(formData: UpdateCurrentUserPasswordForm) {
    try {

        console.log(formData);
        

        const { data } = await api.post('/usuarios/actualizar-password-actual', formData)     
        console.log(data);

        return data

    } catch (error) {

        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }
    }
}



