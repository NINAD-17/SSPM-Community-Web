import { useEffect, useState } from "react";

const GroupInfoCard = ({ groupId }) => {
    const [ group, setGroup ] = useState("");
    console.log("tyop", typeof group.admins);
    console.log("tyop", typeof group.members);

    const getGroupInfo = async() => {
        const response = await fetch(`http://localhost:3000/groups/${groupId}`, {
            method: "GET"
        });

        const groupInfo = await response.json();
        console.log({groupInfo});
        setGroup(groupInfo);
    }

    useEffect(() => {
        getGroupInfo();
    }, []);

    if(group === "") return;

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
                    <div className="flex justify-between">
                        <p className="text-gray-700">Created On</p>
                        <p className="font-semibold text-gray-700"> 26 Mar 2024</p>
                    </div>
                    
                </div>
                
            </div>
        </>
    )
}

export default GroupInfoCard;