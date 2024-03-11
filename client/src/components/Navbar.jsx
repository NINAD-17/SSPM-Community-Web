import { useState } from "react";
import { useSelector } from "react-redux"

function Navbar() {
    const [ isProfileHover, setProfileHover ] = useState(false);
    const user = useSelector(state => state.user);
    
    return (
        <nav className="fixed top-0 z-0 bg-white w-full h-16 flex justify-between items-center p-6 border-b border-blue-200">
            <div className="left flex items-center">
                <div className="logo font-bold text-2xl sm:text-3xl cursor-pointer text-blue-600">SSPM COMMUNITY</div>
                <div className="hidden md:block ml-3">
                    <form action="">
                        <input className="p-2 rounded-2xl border border-blue-400 focus:outline-blue-600" type="text" placeholder="Search" />
                    </form>
                </div>
            </div>
            <div className="right">
                <ul className="hidden sm:flex space-x-4 text-lg text-blue-800">
                    <li className="cursor-pointer hidden md:hidden sm:flex sm:flex-col sm:items-center hover:text-blue-400">
                        <span className="material-symbols-outlined">search</span>
                        <h3 className="text-xs xl:text-sm mt-0.5">Search</h3>
                    </li>
                    <li className="cursor-pointer flex flex-col items-center hover:text-blue-400">
                        <span className="material-symbols-outlined">notifications</span>
                        <h3 className="text-xs xl:text-sm mt-0.5">Notifications</h3>
                    </li>
                    <li className="cursor-pointer flex flex-col items-center hover:text-blue-400">
                        <span className="material-symbols-outlined">work</span>
                        <h3 className="text-xs xl:text-sm mt-0.5">Opportunities</h3>
                    </li>
                    <li className="cursor-pointer flex flex-col items-center hover:text-blue-400">
                        <span className="material-symbols-outlined">dark_mode</span>
                        <h3 className="text-xs xl:text-sm mt-0.5">Mode</h3>
                    </li>
                    <li className="cursor-pointer flex flex-col items-center overflow-hidden hover:text-blue-400" onMouseEnter={() => setProfileHover(true)} onMouseLeave={() => setProfileHover(false)} >
                        <img className={`h-6 w-6 rounded-full border object-cover ${isProfileHover ? "border-blue-500": ""}`} src={`${(user !== null && user.picturePath) ? user.picturePath : "../../user.png"}`} alt="" />
                        {/* <span className="material-symbols-outlined">account_circle</span> */}
                        <h3 className="text-xs xl:text-sm mt-0.5">Profile</h3>
                    </li>
                </ul>
                <div className="hamburger sm:hidden cursor-pointer">
                    <span className="material-symbols-outlined text-blue-800 hover:text-blue-400 text-xl">menu</span>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
