import { useEffect, useState } from "react";
import GroupCard from "./GroupCard"
import { useDispatch, useSelector } from "react-redux";
import { setGroups } from "../state";

function Groups() {

    const allGroups = useSelector(state => state.groups);
    console.log({allGroups})
    const dispatch = useDispatch();

    const getGroups = async() => {
        const response = await fetch(`http://localhost:3000/groups/`);
        const groups = await response.json();
        console.log("DB groups: ", groups);

        dispatch(setGroups({ groups: groups }));
    }

    useEffect(() => {
        getGroups();
    }, []);

    return (
        <div className="bg-white rounded-xl py-4 mb-4 shadow">
            <h1 className="text-lg font-semibold mx-4 mb-2">Groups</h1>
            { 
                allGroups.map((group) => (
                    <GroupCard key={group._id} groupId={group._id} name={group.name} totalMembers={group.members.length} groupLogo={group.groupPicturePath} />
                ))
            }
        </div> 
    )
}

export default Groups
