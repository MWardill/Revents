import { toggleForm } from "../../../features/events/eventSlice";
import { useAppDispatch } from "../../../lib/stores/store";

export default function Navbar() {

    const dispatch = useAppDispatch();

    return (
        <header className="headernav p-2 w-full sticky top-0 z-50 bg-gradient-to-r from-primary to-black">
            <div className="flex align-middle items-center px-10 mx-auto gap-6">
                <a className="max-h-16 text-white flex items-center gap-3 border-r-white border-r-2 pr-6">
                    <h3 className="text-2xl font-semibold text-white uppercase">Re-vents</h3>
                </a>
                <nav className="flex gap-3 my-2 font-semibold uppercase text-lg text-white">
                    <a>Events</a>
                    <a onClick={() => dispatch(toggleForm(null))}>Create</a>
                </nav>
                <div className="flex align-middle ml-auto gap-3">
                    <button className="btn btn-sm">Login</button>
                    <button className="btn btn-sm">Register</button>
                </div>
            </div>
        </header>
    )
}