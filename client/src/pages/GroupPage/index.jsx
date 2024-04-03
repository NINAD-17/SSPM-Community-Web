import GroupPosts from "../../components/GroupPosts";
import GroupInfoCard from "../../components/GroupInfoCard";
import Navbar from "../../components/Navbar";
import Admins from "../../components/Admins";
import { useParams } from "react-router-dom";
import Members from "../../components/Members";
import CreateGroupPost from "../../components/CreateGroupPost";
import { useDispatch, useSelector } from "react-redux";
import { setGroup } from "../../state";
import { useEffect } from "react";

const GroupPage = () => {
    const { groupId } = useParams();
    const dispatch = useDispatch();
    const gr = useSelector(state => state.group);
    console.log(gr);

    const getGroupInfo = async() => {
        const response = await fetch(`http://localhost:3000/groups/${ groupId }`, {
            method: "GET"
        });

        const groupInfo = await response.json();
        console.log({groupInfo})
        dispatch(setGroup(groupInfo));
    }

    useEffect(() => {
        console.log("getgrcalled");
        getGroupInfo();
    }, [groupId]);

    if(useSelector(state => state.group === null)) return <div className="flex justify-center items-center h-dvh"><img className="h-20 w-20" src="../../loading_blue.gif" alt="" /></div> ;

    return (
        <>
            <Navbar />
            <div className="mt-16 bg-blue-50 grid sm:grid-cols-12 max-w-7xl mx-auto gap-3 p-2 sm:p-3 md:p-4 lg:p-5">
                <div className="sm:col-span-4 lg:col-span-3 rounded-xl">
                    <GroupInfoCard groupId={groupId} />
                </div>
                <div className="sm:col-span-8 lg:col-span-6 rounded-xl">
                    <CreateGroupPost />
                    <GroupPosts groupId={groupId} />
                </div>
                <div className="hidden lg:block lg:col-span-3 rounded-xl">
                    <Admins groupId={groupId} />
                    <div className="my-4"></div>
                    <Members groupId={groupId} />
                </div>
            </div>
        </>
    )
}

export default GroupPage;
