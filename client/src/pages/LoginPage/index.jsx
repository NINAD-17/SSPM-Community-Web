// import Navbar from "../../components/Navbar";

const LoginPage = () => {

    const isLogin = false;

    return (
        <>
            {isLogin ? 
                <div className="flex flex-col gap-8 justify-center items-center w-full h-screen">
                <div>
                    <p className="text-2xl text-slate-700">Log in to</p>
                    <h1 className="text-4xl font-extrabold text-blue-800 md:text-5xl">SSPM COMMUNITY</h1>
                </div>
                <div className="p-4 bg-blue-100 rounded-xl w-2/3 md:w-3/5 lg:w-96">
                    <form action="">
                            <div className="">
                                <label htmlFor="email" className="block text-sm font-medium mb-2 lg:text-md">Your Email</label>
                                <input type="email" name="email" className="mb-2 w-full outline-1 outline-blue-400 rounded-xl p-2 text-md" placeholder="Enter your email" />
                            </div>
                            <div className="">
                                <label htmlFor="password" className="block text-sm font-medium mb-2 lg:text-md">Password</label>
                                <input type="password" name="password" className="mb-2 w-full outline-1 outline-blue-400 rounded-xl p-2 text-md" placeholder="Enter password" />
                            </div>
                            <div>
                                <p className="text-right text-sm text-blue-800">forgot password?</p>
                            </div>
                            <button type="submit" className="w-full bg-blue-800 p-2 rounded-xl mt-7 text-white hover:bg-blue-500">Log In</button>
                        </form>
                </div>
            </div>    
            :   <div>
                    <div>
                        <p className="text-2xl text-slate-700">Register to</p>
                        <h1 className="text-4xl font-extrabold text-blue-800 md:text-5xl">SSPM COMMUNITY</h1>
                    </div>
                    <div></div>
                </div>
            }
            
        </>
    )
}

export default LoginPage;