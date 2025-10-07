import { CalendarIcon, PowerIcon, UserIcon } from "@heroicons/react/24/outline";
import { useAppBase } from "../../../lib/hooks/useBaseComponent";
import { useNavigate } from "react-router";
import { auth } from "../../../lib/firebase/firebase";
import { signOut } from "firebase/auth";

export default function UserMenu() {
    const { user } = useAppBase();
    const navigate = useNavigate();

    const handleSignOut = async () => {     
        await signOut(auth);
        navigate('/');
    }

    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-accent m-1">
                <div className="avatar">
                    <div className="w-11 rounded-full">
                        <img src={user?.photoURL || '/user.png'} alt="User Avatar" />
                    </div>
                </div>
                <span>{user?.displayName}</span>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li>
                    <div className="flex items-center gap-3">
                        <UserIcon className="size-6" />
                        Profile
                    </div>
                </li>
                <li>
                    <div className="flex items-center gap-3">
                        <CalendarIcon className="size-6" />
                        Create Event
                    </div>
                </li>
                <div className="divider my-0"></div>
                <li>
                    <div onClick={handleSignOut}  className="flex items-center gap-3">
                        <PowerIcon className="size-6 text-error" />
                        Sign Out
                    </div>
                </li>
            </ul>
        </div>
    )
}