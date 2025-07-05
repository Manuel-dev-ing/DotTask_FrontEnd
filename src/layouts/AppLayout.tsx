import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import NavMenu from "@/components/NavMenu";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "@/hooks/useAuth";

export default function AppLayout() {

    const { data, isError, isLoading } = useAuth()
    const navigate = useNavigate()

    if (isLoading) return 'Cargando...'

    if (isError) {
        console.log("is Error..");
        navigate('/auth/login');
        // return <Navigate to='/auth/login' />
    }



  if(data) return (
    <>
        <header className="bg-white py-5 shadow-md">
            <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center px-8">
                <div className="">
                    <Link to={'/'} className="text-black text-3xl font-bold font-sans">
                        DotTask
                    </Link>
                </div>

                <NavMenu 
                    name={data.nombre}
                />

            </div>
        </header>

        <section className="max-w-screen-2xl mx-auto mt-10 p-5">
            <Outlet />

        </section>
        <footer className="py-5">
            <p className="text-center">
                Todos los derechos reservados {new Date().getFullYear()}
            </p>
        </footer>

        <ToastContainer 
            pauseOnHover={false}
            pauseOnFocusLoss={false}
        />

    </>

  )
}
