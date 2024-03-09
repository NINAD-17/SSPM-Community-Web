
function Navbar() {
    
    return (
        <nav className="bg-white w-full h-16 flex justify-between items-center p-6 border-b">
            <div className="left flex items-center">
                <div className="logo font-bold text-2xl sm:text-3xl cursor-pointer text-blue-600">SSPM Community</div>
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
                    <li className="cursor-pointer flex flex-col items-center hover:text-blue-400">
                        <span className="material-symbols-outlined">account_circle</span>
                        <h3 className="text-xs xl:text-sm mt-0.5">Profile</h3>
                    </li>
                </ul>
                <div className="hamburger sm:hidden cursor-pointer">
                    <img className="w-5" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png" alt="" />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
