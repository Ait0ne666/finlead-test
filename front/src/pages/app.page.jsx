import { useNavigate, Navigate, Routes, Route } from 'react-router-dom';
import { logout, useUser } from '../data/queries/user'
import { useQueryClient, useMutation } from 'react-query'
import AccountPage from './account.page';
import PeoplePage from './people.page';
import Header from '../components/Header/header';

const AppPage = () => {
    const { data: user, isError, } = useUser();
    const loggedIn = user && !isError
    const queryClient = useQueryClient();

    if (!loggedIn) {
        return <Navigate to="/" replace />
    }


    const onLogout = () => {
        logout()
        queryClient.invalidateQueries("user");
    }


    return (
        <>
            <Header onLogout={onLogout} />
            <Routes>
                <Route path="/account" element={<AccountPage />}>

                </Route>
                <Route path="/people" element={<PeoplePage />}>

                </Route>
            </Routes>
        </>
    )
}




export default AppPage