import { NavLink } from "react-router-dom"
import CustomButton from "../CustomButton/custom-button"

const Header = ({ onLogout }) => {



    return (
        <header className="w-full fixed top-0 left-0 flex justify-between px-10 py-3">
            <div className="flex items-center">
                <NavLink
                    to="/account"
                    className={({ isActive }) =>
                        isActive ? "font-bold text-base mr-5 text-primary underline" : "text-base mr-5"
                    }
                >
                    Account
                </NavLink>
                <NavLink
                    to="/people"
                    className={({ isActive }) =>
                        isActive ? "font-bold text-base text-primary underline" : "text-base"
                    }
                >
                    People
                </NavLink>
            </div>
            <div className="w-40">
                <CustomButton
                    onClick={onLogout}
                    title="Logout"
                />
            </div>
        </header>
    )
}




export default Header