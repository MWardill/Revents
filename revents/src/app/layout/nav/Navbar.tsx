import { NavLink, useNavigate } from "react-router";

import { useAppBase } from "../../../lib/hooks/useBaseComponent";
import UserMenu from "./UserMenu";
import { signIn } from "../../../features/account/AccountSlice";

export default function Navbar() {
    const { user, dispatch } = useAppBase();
    const navigate = useNavigate();

    const handleSignIn = () => {
        dispatch(signIn());
        navigate("/events");
    }

    return (
        <header className="headernav p-2 w-full sticky top-0 z-50 bg-gradient-to-r from-primary to-info">
            <div className="flex align-middle items-center px-10 mx-auto gap-6">
                <div className="h-12 text-white flex items-center gap-3 border-r-white border-r-2 pr-6">
                    <NavLink to='/' className="text-2xl font-semibold text-white uppercase">Re-vents</NavLink>
                </div>
                <nav className="flex gap-3 my-2 font-semibold uppercase text-lg text-white">
                    <NavLink to='/events' end>Events</NavLink>
                    <NavLink to='/createEvent'>Create</NavLink>
                </nav>
                <div className="flex align-middle ml-auto gap-3">
                    {user ? (<UserMenu />) : (
                        <>
                            <button onClick={handleSignIn} className="btn btn-sm">Login</button>
                            <button className="btn btn-sm">Register</button>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}