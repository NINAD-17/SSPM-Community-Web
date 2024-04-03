import { useEffect, useState } from "react";
import AdminMemberCard from "./AdminMemberCard";

const Members = ({ groupId }) => {
    const [ group, setGroup ] = useState(null);
    const groupMembers = group ? group.members : [];

    const getGroupInfo = async() => {
        const response = await fetch(`http://localhost:3000/groups/${ groupId }`, {
            method: "GET"
        });

        const groupInfo = await response.json();
        console.log({groupInfo})
        setGroup(groupInfo);
    }

    useEffect(() => {
        getGroupInfo();
    }, [groupId]);

    if(group === null) return <div className="flex justify-center items-center h-dvh"><img className="h-20 w-20" src="../loading_blue.gif" alt="" /></div>

    return (
        <div className="bg-white rounded-xl py-4 shadow">
            <h1 className="text-lg font-semibold mx-4 mb-2">Members</h1>
            {
                groupMembers.map(member => (
                    <AdminMemberCard key={member} userId={member} />
                ))
            }
        </div>
    )
}

export default Members;