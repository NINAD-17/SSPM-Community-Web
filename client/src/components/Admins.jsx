import { useEffect, useState } from "react";
import AdminMemberCard from "./AdminMemberCard";

const Admins = ({ groupId }) => {
    const [ group, setGroup ] = useState(null);
    const groupAdmins = group ? group.admins : [];

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
            <h1 className="text-lg font-semibold mx-4 mb-2">Admins</h1>
            {
                groupAdmins.map(admin => (
                    <AdminMemberCard key={admin} userId={admin} />
                ))
            }
        </div>
    )
}

export default Admins;