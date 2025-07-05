import { isAxiosError } from "axios";
import { userSchema, type CheckPasswordForm, type ConfirmToken, type ForgotPasswordForm, type NewPasswordForm, type RequestConfirmationCodeForm, type UserLoginForm, type UserRegistrationForm } from "../types";
import api from "@/lib/axios";

export async function createAcount(formData: UserRegistrationForm) {
    try {
        console.log(formData);
        const url = '/usuarios/registro'
        const { data } = await api.post<string>(url, formData)
        console.log(data);
        
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }        
    }
}


export async function confirmAccount(formData: ConfirmToken) {
    try {
        console.log(formData.token);
        const token = formData.token
        const url = `/usuarios/confirmar?token=${token}`
        const { data } = await api.get(url)
        console.log(data);
        
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }        
    }
}

export async function RequestConfirmationCode(formData: RequestConfirmationCodeForm) {
    try {
        console.log(formData);
        const url = `/usuarios/solicitar-codigo`
        const { data } = await api.post<string>(url, formData)
        console.log(data);
        
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        }        
    }
}

export async function authenticateUser(formData: UserLoginForm) {
    try {
        
        const url = '/usuarios/login'
        const response = await api.post(url, formData)
        localStorage.setItem("auth_token", response.data.token)
        
        return response.data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        } 
    }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
    try {
        
        console.log(formData);

        const url = `/usuarios/olvide-password`
        const response = await api.post(url, formData)
        console.log(response.data);
        
        return response.data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        } 
    }
}

export async function validateToken(formData: ConfirmToken) {
    try {
        
        console.log(formData);

        const url = `/usuarios/validar-token`
        const response = await api.post(url, formData)
        console.log(response.data);
        
        return response.data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        } 
    }
}


export async function updatePasswordToken({formData, token} : {formData: NewPasswordForm, token: string}) {
    try {
        console.log("updatePasswordToken");
        
        console.log(formData);

        const url = `/usuarios/actualizar-password?token=${token}`
        const response = await api.post(url, formData)
        console.log(response.data);
        
        return response.data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        } 
    }
}

export async function getUser() {
    try {
        const { data } = await api('/usuarios/usuario')
        const response = userSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        } 
    }
}


export async function checkPassword(formData : CheckPasswordForm) {
    try {
        const url = '/usuarios/verificar-password'
        const { data } = await api.post(url, formData)
        console.log(data);
        return data


    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data)
        } 
    }
}





