import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ userId }) => {

    const [ user, setUser ] = useState(null);
    const navigate = useNavigate();

    const getUser = async() => {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: "GET"
        });
        const data = await response.json();

        // if(response.status === 404) navigate("/404"); // :( User not found

        console.log({response}, {data});
        setUser(data);
    }

    // When should we call getUser()?
    // Whenever this component is loaded call it.
    useEffect(() => {
        getUser();
    }, []);

    if(!user) {
        return null;
    }

    const { firstName, lastName, headline, picturePath } = user;
    console.log({user});

    return (
        <>
            <div className="bg-white shadow rounded-xl p-6">
                <img src={`${picturePath ? picturePath : "../../user.png"}`} alt="Profile" className="h-24 w-24 sm:h-20 sm:w-20 rounded-full mx-auto object-cover border" />
                <h2 className="text-xl font-semibold mt-2 text-center hover:underline sm:text-lg cursor-pointer" onClick={() => navigate(`/profile/${userId}`)}>{ user ? `${firstName} ${lastName}` : `User Name` }</h2>
                <p className="text-md text-center text-gray-600 sm:text-sm">{ headline }</p>
                <hr className="border-blue-400 my-3" />
                <div className="text-md sm:text-sm">
                    <div className="flex justify-between">
                        <p className="">Profile viewers </p>
                        <p>10</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="">Post Impressions </p>
                        <p>100</p>
                    </div>
                    <hr className="border-blue-400 my-3" />
                </div>
            </div>
        </>
    )
}

export default ProfileCard
