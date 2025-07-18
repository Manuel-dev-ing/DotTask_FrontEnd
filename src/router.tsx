import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateProyectView from "./views/proyects/CreateProyectView";
import EditProjectView from "./views/proyects/EditProjectView";
import ProjectDetailView from "./views/proyects/ProjectDetailView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestNewCodeView from "./views/auth/RequestNewCodeView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import ProjectTeamView from "./views/proyects/ProjectTeamView";
import ProfileView from "./views/profile/ProfileView";
import ChangePasswordView from "./views/profile/ChangePasswordView";
import ProfileLayout from "./layouts/ProfileLayout";
import NotFound from "./views/404/NotFound";


export default function Router() {
    

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardView />} index />
                    <Route path="/proyects/create" element={<CreateProyectView />} />
                    <Route path="/proyects/:ProjectId" element={<ProjectDetailView />} />
                    <Route path="/proyects/:ProjectId/edit" element={<EditProjectView />} />
                    <Route path="/proyects/:ProjectId/team" element={<ProjectTeamView />} />

                    <Route element={<ProfileLayout/>}>
                        <Route path="/profile" element={<ProfileView />} />
                        <Route path="/profile/password" element={<ChangePasswordView />} />
                    </Route>
                </Route>

                <Route element={<AuthLayout />}> 
                    <Route path='/auth/login' element={<LoginView /> } />
                    <Route path='/auth/register' element={<RegisterView /> } />
                    <Route path='/auth/confirm-account' element={<ConfirmAccountView /> } />
                    <Route path='/auth/request-code' element={<RequestNewCodeView /> } />
                    <Route path='/auth/forgot-password' element={<ForgotPasswordView /> } />
                    <Route path='/auth/new-password' element={<NewPasswordView /> } />
                </Route>

                <Route element={ <AuthLayout/> }>
                    <Route path="/404" element={<NotFound /> }/>
                </Route>

            </Routes>
        
        </BrowserRouter>

    )
}







