import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminMemberCard = ({ userId }) => {

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

    useEffect(() => {
        getUser();
    }, [ userId ]);

    if(user === null) return <div className="flex justify-center items-center h-dvh"><img className="h-10 w-10" src="../loading_blue.gif" alt="" /></div>

    return (
         <>
            <div className="px-6 py-3 flex items-center">
            <img className="h-12 w-12 rounded-full mr-4 object-cover" src={user.picturePath === "" || user.picturePath === undefined ? "../../user.png" : user.picturePath } alt="" />
            <div className="flex items-center justify-between flex-grow">
            <div className="">
                <h2 className="group-name text-md font-semibold cursor-pointer hover:underline" onClick={() => navigate(`/profile/${user._id}`)} >
                    {`${user.firstName} ${user.lastName}`}
                </h2>
                <p className="text-gray-400">{ user.status }</p>
            </div>
            <div className="ml-7 cursor-pointer text-blue-800 hover:text-blue-400" >
                {/* {isFriend ? (
                    <span className="material-symbols-outlined">person_remove</span>
                ) : (
                    <span className="material-symbols-outlined">person_add</span>
                )} */}
            </div>
        </div>
        <hr className="border-gray-300 my-3" />
        </div>

        </>
    )
}

export default AdminMemberCard;