// import Navbar from "../../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ pageType, setPageType ] = useState("login");
    const isLogin = pageType === "login" ? true : false;

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ fname, setFname ] = useState("");
    const [ lname, setLname ] = useState("");
    const currYear = new Date().getFullYear();
    const [ gradYear, setGradYear ] = useState("");

    const login = async() => {
        const data = { email, password, fname, lname };
        console.log(typeof email, typeof password)
        const loggedInResponse = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" }, // This will tell the server that you’re sending JSON data.
            body: JSON.stringify(data)
        });

        const loggedIn = await loggedInResponse.json();
        console.log({loggedInResponse});
        console.log({loggedIn});
        setEmail("");
        setPassword("");

        if(loggedInResponse.status === 200 && loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                })
            );
            navigate("/home");
        }
    }

    const register = async() => {
        const data = { firstName: fname, lastName: lname, email, password };

        const registeredResponse = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" }, // This will tell the server that you’re sending JSON data.
            body: JSON.stringify(data)
        });

        const registered = await registeredResponse.json();
        setFname("");
        setLname("");
        setEmail("");
        setPassword("");
        console.log({registered});

        try {
            if(registered.status === 201) {
            setPageType("login");
        }
        } catch(error) {
            console.log(error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        isLogin ? login(event) : register(event);
    }

    return (
        <>
            {isLogin ? 
                <div className="flex flex-col gap-8 justify-center items-center w-full h-screen">
                <div>
                    <p className="text-2xl text-slate-700">Log in to</p>
                    <h1 className="text-4xl font-extrabold text-blue-800 md:text-5xl">SSPM COMMUNITY</h1>
                </div>
                <div className="p-4 bg-blue-100 rounded-xl w-2/3 md:w-3/5 lg:w-96">
                    <form onSubmit={handleSubmit}>
                            <div className="">
                                <label htmlFor="email" className="block text-sm font-medium mb-2 lg:text-md">Your Email</label>
                                <input type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mb-2 w-full outline-1 outline-blue-400 rounded-xl p-2 text-md" placeholder="Enter your email" />
                            </div>
                            <div className="">
                                <label htmlFor="password" className="block text-sm font-medium mb-2 lg:text-md">Password</label>
                                <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mb-2 w-full outline-1 outline-blue-400 rounded-xl p-2 text-md" placeholder="Enter password" />
                            </div>
                            <div>
                                <p className="text-right text-sm text-blue-800 cursor-pointer">forgot password?</p>
                            </div>
                            <button type="submit" className="w-full bg-blue-800 p-2 rounded-xl mt-7 text-white hover:bg-blue-500">Log In</button>
                            <p className="text-sm text-gray-500 cursor-pointer text-center mt-2">Not registered yet? <span className="hover:underline text-blue-500 hover:text-blue-600" onClick={() => {setPageType("register")}}>Register here</span></p>
                        </form>
                </div>
            </div>    
            :   <div className="flex flex-col gap-8 justify-center items-center w-full h-screen">
                    <div>
                        <p className="text-2xl text-slate-700">Register to</p>
                        <h1 className="text-4xl font-extrabold text-blue-800 md:text-5xl">SSPM COMMUNITY</h1>
                    </div>
                    <div className="p-4 bg-blue-100 rounded-xl w-2/3 md:w-3/5 lg:w-96">
                        <form onSubmit={handleSubmit}>
                            <div className="flex gap-5">
                                <div>
                                    <label htmlFor="fname" className="block text-sm font-medium mb-2 lg:text-md">First Name</label>
                                    <input type="text" name="fname" value={fname} onChange={(event) => setFname(event.target.value)} placeholder="First Name" className="mb-2 w-full outline-1 outline-blue-400 rounded-xl p-2 text-md" />
                                </div>
                                <div>
                                    <label htmlFor="lname" className="block text-sm font-medium mb-2 lg:text-md">Last Name</label>
                                    <input type="text" name="lname" value={lname} onChange={(event) => setLname(event.target.value)} placeholder="Last Name" className="mb-2 w-full outline-1 outline-blue-400 rounded-xl p-2 text-md" />
                                </div>
                            </div>
                            <div className="">
                                <label htmlFor="email" className="block text-sm font-medium mb-2 lg:text-md">Your Email</label>
                                <input type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mb-2 w-full outline-1 outline-blue-400 rounded-xl p-2 text-md" placeholder="Enter your email" />
                            </div>
                            <div className="">
                                <label htmlFor="password" className="block text-sm font-medium mb-2 lg:text-md">Password</label>
                                <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mb-2 w-full outline-1 outline-blue-400 rounded-xl p-2 text-md" placeholder="Create a strong password (min 8 characters)" />
                            </div>
                            <div className="">
                                <label htmlFor="gradYear" className="block text-sm font-medium mb-2 lg:text-md">Graduation Year</label>
                                <input type="number" name="gradYear" min={2000} max={currYear + 4} value={gradYear} onChange={(event) => setGradYear(event.target.value)} className="mb-2 w-full outline-1 outline-blue-400 rounded-xl p-2 text-md" placeholder={currYear} />
                            </div>
                            <button type="submit" className="w-full bg-blue-800 p-2 rounded-xl mt-7 text-white hover:bg-blue-500">Register</button>
                            <p className="text-sm text-gray-500 cursor-pointer text-center mt-2">Already a user? <span className="hover:underline text-blue-500 hover:text-blue-600" onClick={() => {setPageType("login")}}>Login here</span></p>
                        </form>
                    </div>
                </div>
            }
            
        </>
    )
}

export default LoginPage;