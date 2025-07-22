import { FiUser } from 'react-icons/fi';

export default function Navbar() {
    return (
        <nav className="w-full bg-blue-100 shadow flex items-center justify-between px-4 h-14 fixed top-0 left-0 z-50">
            <div className="flex-1" />
            <div className="flex-0 flex justify-center flex-1">
                <h1 className="font-bold text-lg sm:text-xl text-center">IPL Dashboard</h1>
            </div>
            <div className="flex-1 flex justify-end">
                <button
                    type="button"
                    className="rounded-full p-2 hover:bg-gray-100 transition"
                    aria-label="Login"
                >
                    <FiUser className="w-6 h-6" />
                </button>
            </div>
        </nav>
    );
}
