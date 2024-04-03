import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGroup, setGroupMembers } from "../state";

const GroupInfoCard = ({ groupId }) => {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.user);
    const group = useSelector(state => state.group);
    console.log("gr", group);
    // console.log("tyop", typeof group.admins);
    // console.log("tyop", typeof group.members);

    const getGroupInfo = async() => {
        const response = await fetch(`http://localhost:3000/groups/${groupId}`, {
            method: "GET"
        });

        const groupInfo = await response.json();
        console.log({groupInfo});
        dispatch(setGroup(groupInfo));
    }

    const joinOrLeaveGroup = async() => {
        const response = await fetch(`http://localhost:3000/groups/${groupId}/member/${loggedInUser._id}`, {
            method: "PATCH"
        });

        const members = await response.json();
        console.log({members});
        if(response.status === 200) dispatch(setGroupMembers(members));
    }

    useEffect(() => {
        console.log("ugroup:", group);
        getGroupInfo();
    }, []);

    if(group === null || group.members === null) {
    return <div>Loading...</div>;
}


    return (
        <>
            <div className="bg-white shadow rounded-xl p-6 pb-3">
                <img src={group.groupPicturePath === "" || group.groupPicturePath === undefined ? "../../user.png" : group.groupPicturePath} alt="Profile" className="h-24 w-24 sm:h-20 sm:w-20 rounded-xl mx-auto object-cover border" />
                <h2 className="text-xl font-semibold mt-2 text-center hover:underline sm:text-lg lg:text-xl cursor-pointer">{group.name}</h2>
                <p className="text-md text-center text-gray-600 sm:text-sm lg:text-base">
                    {group.description}
                </p>
                <hr className="border-blue-400 my-2" />
                <div className="text-base sm:text-sm lg:text-base space-y-0">
                    <div className="flex justify-between">
                        <p className="text-gray-700">Admins </p>
                        <p className="font-semibold text-gray-700">{Object.keys(group.admins).length}</p>
                    </div>
                    <div className="flex justify-between flex-wrap">
                        <p className="text-gray-700">Members </p>
                        <p className="font-semibold text-gray-700">{Object.keys(group.members).length}</p>
                    </div>
                    <div className="flex justify-between mb-4">
                        <p className="text-gray-700 mb-2">Created On</p>
                        <p className="font-semibold text-gray-700"> 26 Mar 2024</p>
                    </div>
                    <hr className="border-blue-400 my-2" />
                    <div className="flex justify-center items-center text-blue-700 hover:text-blue-400 cursor-pointer" onClick={() => joinOrLeaveGroup()}>
                        {   
                            group.members.some(member => member.toString() === loggedInUser._id) 
                            ?   <div className="w-full bg-gray-500 p-2 rounded-xl mt-3 font-semibold text-white hover:bg-red-600 flex space-x-2 justify-center">Leave Group</div>
                            :   <div className="w-full bg-blue-800 p-2 rounded-xl mt-3 font-semibold text-white hover:bg-blue-500 flex space-x-2 justify-center">Join Group</div>
                        }
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default GroupInfoCard;