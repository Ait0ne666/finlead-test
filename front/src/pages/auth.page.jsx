import { useState } from "react";
import { Navigate } from "react-router-dom";
import Auth from "../components/Auth/auth";
import Register from "../components/Register/register";
import { useUser } from "../data/queries/user";

const AuthPage = () => {
    const { data: user, isError } = useUser();
    const loggedIn = user && !isError
    const [isAuth, setIsAuth] = useState(true)

    if (loggedIn) {
        return <Navigate to="/account" replace />
    }



    const toggleAuth = () => {
        setIsAuth(c => !c)
    }

    return (
        <div className="min-w-full min-h-screen flex justify-center items-center flex-col">
            <h2 className=" text-primary-text font-bold text-2xl">
                <span className="cursor-pointer " onClick={toggleAuth}>Вход</span> 
                {" "}/{" "}
                <span className="cursor-pointer" onClick={toggleAuth}>Регистрация</span></h2>
            {
                isAuth ?
                    <Auth />
                    :
                    <Register />
            }
        </div>
    )
}



export default AuthPage