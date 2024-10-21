import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state";
import { academicYearCalc } from "../utils/academicYear";

const ProfileCard = ({ userId }) => {

    const [ user, setUser ] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.user); // .id
    const [ isFriend, setIsFriend ] = useState(false);

    const getUser = async() => {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: "GET"
        });
        const data = await response.json();

        // if(response.status === 404) navigate("/404"); // :( User not found

        // console.log({response}, {data});
        setUser(data);
        setIsFriend(loggedInUser.friends.find((friend) => friend._id === userId))
    }

    const patchFriend = async() => {
        const response = await fetch(`http://localhost:3000/users/${loggedInUser._id}/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        // console.log("likes: ", {data});
        dispatch(setFriends({ friends: data }));
    }

    // When should we call getUser()?
    // Whenever this component is loaded call it.
    useEffect(() => {
        getUser();
    }, [userId]);

    if(!user) {
        return null;
    }

    const { firstName, lastName, headline, picturePath, status, branch, gradYear } = user;
    // console.log({user});

    return (
        <>
            <div className="bg-white shadow rounded-xl p-6 pb-3">
                <img src={`${picturePath ? picturePath : "../../user.png"}`} alt="Profile" className="h-24 w-24 sm:h-20 sm:w-20 rounded-full mx-auto object-cover border" />
                <h2 className="text-xl font-semibold mt-2 text-center hover:underline sm:text-lg lg:text-xl cursor-pointer" onClick={() => navigate(`/profile/${userId}`)}>{ user ? `${firstName} ${lastName}` : `User Name` }</h2>
                <p className="text-md text-center text-gray-600 sm:text-sm lg:text-base">{ headline }</p>
                <hr className="border-blue-400 my-2" />
                <div className="text-base sm:text-sm lg:text-base space-y-0">
                    <div className="flex justify-between">
                        <p className="text-gray-700">Status </p>
                        <p className="font-semibold text-gray-700">{ status }</p>
                    </div>
                    {
                        user.status === "Student" 
                        ? 
                            <div className="flex justify-between">
                                <p className="text-gray-700">Currently In </p>
                                <p className="font-semibold text-gray-700">{ academicYearCalc(user.gradYear) } Year</p>
                            </div>
                        : 
                            <></>
                    }
                    <div className="flex justify-between flex-wrap">
                        <p className="text-gray-700">Branch </p>
                        <p className="font-semibold text-gray-700">{ branch }</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-700">Graduation Year </p>
                        <p className="font-semibold text-gray-700">{ gradYear }</p>
                    </div>
                </div>
                <hr className="border-blue-400 my-2" />
                {
                    user.socialHandles.length > 0 ? 
                        <>
                            <div className="text-base sm:text-sm lg:text-base">
                                <h3 className="font-semibold text-gray-900">Social Profiles</h3>
                                <ul>
                                    {
                                        user.socialHandles.map((handle) => (
                                            <li key={handle.url} className=""><a className="cursor-pointer hover:underline text-gray-700 hover:text-blue-400" href={`${handle.url}`} target="_blank">{handle.name}</a></li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <hr className="border-blue-400 my-2" />
                        </>
                        
                    : <></>
                }
                
                
                {
                    userId === loggedInUser._id ?
                        <div className="flex justify-center items-center text-blue-700 hover:text-blue-400" onClick={() => navigate(`/${userId}/edit`)}>
                            <p className="text-center text-sm cursor-pointer">Edit Profile </p>
                            <span className="material-symbols-outlined text-base ml-1 cursor-pointer">edit</span>
                        </div> 
                    :   <div className="flex justify-center items-center text-blue-700 hover:text-blue-400">
                                {
                                    isFriend ? 
                                    <button onClick={patchFriend} className="w-full bg-gray-500 p-2 rounded-xl mt-3 text-white hover:bg-red-600 flex space-x-2 justify-center">
                                        <p>Remove Friend</p>
                                        <span className="material-symbols-outlined">person_remove</span>
                                    </button>
                                    : 
                                    <button onClick={patchFriend} className="w-full bg-blue-800 p-2 rounded-xl mt-3 text-white hover:bg-blue-500 flex space-x-2 justify-center">
                                        <p>Add as a Friend</p> 
                                        <span className="material-symbols-outlined">person_add</span>
                                    </button>
                                }
                        </div> 
                }
            </div>
        </>
    )
}

export default ProfileCard
