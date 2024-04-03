import { useEffect, useState } from "react";
import GroupCard from "./GroupCard"
import { useDispatch, useSelector } from "react-redux";

function Groups() {

    const [ groups, setGroups ] = useState(null);

    const getGroups = async() => {
        const response = await fetch(`http://localhost:3000/groups/`);
        const groups = await response.json();
        console.log("DB groups: ", groups);

        setGroups(groups);
    }

    useEffect(() => {
        getGroups();
    }, []);

    if(groups === null) return ;

    return (
        <div className="bg-white rounded-xl py-4 mb-4 shadow">
            <h1 className="text-lg font-semibold mx-4 mb-2">Groups</h1>
            { 
                groups.map((group) => (
                    <GroupCard key={group._id} groupId={group._id} name={group.name} totalMembers={group.members.length} groupLogo={group.groupPicturePath} />
                ))
            }
        </div> 
    )
}

export default Groups
