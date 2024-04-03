import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setLogout, setTheme } from "../state";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ isProfileHover, setProfileHover ] = useState(false);
    const [ isProfileClicked, setIsProfileClicked ] = useState(false);
    const user = useSelector(state => state.user);
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const theme = useSelector(state => state.theme);
    const [ isDark, setIsDark ] = useState(theme === "dark" ? true : false);

    const themeToggle = () => {
        dispatch(setTheme(isDark ? "light" : "dark"));
        setIsDark(!isDark);
    }

    const handleLogOut = () => {
        dispatch(setLogout());
        navigate("/");
    }
    
    return (
        <nav className="fixed top-0 z-10 bg-white dark:bg-black w-full h-16 flex justify-between items-center p-6 border-b border-blue-200">
            <div className="left flex items-center">
                <div className="logo font-bold text-2xl md:text-3xl cursor-pointer text-blue-600" onClick={() => navigate("/home")}>SSPM COMMUNITY</div>
                <div className="hidden md:block ml-3">
                    <form action="">
                        <input className="p-2 rounded-2xl border border-blue-400 focus:outline-blue-600" type="text" placeholder="Search" />
                    </form>
                </div>
            </div>
            <div className="right">
                <ul className={`${isMenuOpen ? "flex-col" : "hidden"} sm:flex space-x-4 text-lg text-blue-800`} >
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
                        <h3 className="text-xs xl:text-sm mt-0.5" onClick={themeToggle}>Mode</h3>
                    </li>
                    <li className="cursor-pointer flex flex-col items-center overflow-hidden " onMouseEnter={() => setProfileHover(true)} onMouseLeave={() => setProfileHover(false)} onClick={() => setIsProfileClicked(!isProfileClicked)} >
                        {
                            isProfileClicked ? 
                                <>
                                    <div className="flex flex-col items-center justify-center ml-2">
                                        <span className="material-symbols-outlined text-2xl h-6 hover:text-blue-400">close</span>
                                        <h3 className="text-xs xl:text-sm mt-0.5 hover:text-blue-400">Close</h3>   
                                    </div>
                                    <div className="absolute bg-white border-blue-200 border w-56 top-16 right-1 rounded-md px-4">
                                        {/* <img className="w-14 rounded-full mx-auto mt-3" src={`${(user !== null && user.picturePath) ? user.picturePath : "../../user.png"}`} alt="" /> */}
                                        <h2 className="text-center font-semibold mt-2">{ `${user.firstName} ${user.lastName}` }</h2>
                                        <button className="w-full bg-blue-400 text-sm py-2 font-semibold rounded-xl mt-3 mb-3 text-white hover:bg-red-500" onClick={handleLogOut} >Log Out</button>
                                    </div>
                                </>
                            : 
                            <>
                                <img className={`h-6 w-6 rounded-full border object-cover ${isProfileHover ? "border-blue-500": ""}`} src={`${(user !== null && user.picturePath) ? user.picturePath : "../../user.png"}`} alt="" />
                                {/* <span className="material-symbols-outlined">account_circle</span> */}
                                <h3 className="text-xs xl:text-sm mt-0.5 hover:text-blue-400">Profile</h3>   
                            </>
                        }
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
