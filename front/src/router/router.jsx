import AppPage from "../pages/app.page"
import AuthPage from "../pages/auth.page"

const { Routes, Route } = require("react-router-dom")

const Router = () => {



    return (
        <Routes>
            <Route path="/" element={<AuthPage />}>

            </Route>
            <Route path="/*" element={<AppPage />}>

            </Route>

        </Routes>
    )
}




export default Router