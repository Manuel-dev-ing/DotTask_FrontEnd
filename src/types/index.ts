import { number, string, z } from "zod";

/* Auth and Users */ 
const authSchema = z.object({
    rol: z.string(),
    nombre: z.string(),
    email: z.string(),
    current_password: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string() 
});

type Auth = z.infer<typeof authSchema>

export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'nombre' | 'email' | 'password' | 'password_confirmation'>
export type ConfirmToken = Pick<Auth, 'token'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>
export type UpdateCurrentUserPasswordForm = Pick<Auth, 'current_password' | 'password' | 'password_confirmation'>
export type CheckPasswordForm = Pick<Auth, 'password'>

// Users
export const userSchema = authSchema.pick({
    rol: true,
    nombre: true,
    email: true
}).extend({
    id: z.number()
})

export type User = z.infer<typeof userSchema>
export type UserProfileForm = Pick<User, 'nombre' | 'email' >


// Notes
const noteSchema = z.object({
    id: z.number(),
    contenido: z.string(),
    creadoPor: z.number(),
    notaCreadoPor:  z.object({
        id: number(),
        nombre: string(),
        email: string()
    }) 
})

export type Note = z.infer<typeof noteSchema>
export type NoteFormData = Pick<Note, 'contenido'>

// Tasks
export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"])
export type TaskStatus = z.infer<typeof taskStatusSchema>

export const taskSchema = z.object({
    id: z.number(),
    idProyecto: z.number(),
    nombre: z.string(),
    descripcion: z.string(),
    estado: z.string(),
    completadoPor: z.number().or(z.null()),
    idUsuario: z.number().or(z.null()),
    nombreUsuario: z.string().or(z.null()),
    emailUsuario: z.string().or(z.null()),
    historialCambiosTareas: z.array(
        z.object({
            id: z.number(),
            nombreUsuario: z.string().or(z.null()),
            status: taskStatusSchema
        })
    ),
    notas: z.array(
        z.object({
            id: z.number(),
            creadoPor: z.number(),
            contenido: z.string(),
            notaCreadoPor: z.object({
                id: z.number(),
                email: z.string(),
                nombre: z.string()
            })
        })
    )
})


export const taskProjectSchema = taskSchema.pick({
    id: true,
    idProyecto: true,
    nombre: true,
    descripcion: true,
    estado: true
})

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'nombre' | 'descripcion'>
export type taskProject = z.infer<typeof taskProjectSchema>

// Projects

export const projectSchema = z.object({

    id: z.number(),
    nombreProyecto: z.string(),
    nombreCliente: z.string(),
    descripcion: z.string(),
    is_Manager: z.boolean(),
    tareas: z.array(taskProjectSchema)
})


export const editProjectSchema = projectSchema.pick({
    nombreProyecto: true,
    nombreCliente: true,
    descripcion: true,
})

export const dashboardProjectSchema = z.array(

    z.object({
        id: z.number(),
        nombreProyecto: z.string(),
        nombreCliente: z.string(),
        descripcion: z.string(),
        rolNombre: z.string(),
        is_Manager: z.boolean(),
        tareas: z.array(
            z.object({
                id: number(),
                nombre: string(),
                idProyecto: number(),
                descripcion: string(),
                estado: string()
            })
        )

    })
)

export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'nombreCliente' | 'nombreProyecto' | 'descripcion'>


// Team
const teamMemberSchema = userSchema.pick({
    id: true,
    email: true,
    nombre: true
})

export const teamMembersSchema = z.array(teamMemberSchema)
export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>


