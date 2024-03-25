import GroupPosts from "../../components/GroupPosts";
import GroupInfoCard from "../../components/GroupInfoCard";
import Navbar from "../../components/Navbar";
import Admins from "../../components/Admins";
import { useParams } from "react-router-dom";
import Members from "../../components/Members";

const GroupPage = () => {
    const { groupId } = useParams();

    return (
        <>
            <Navbar />
            <div className="mt-16 bg-blue-50 grid sm:grid-cols-12 max-w-7xl mx-auto gap-3 p-2 sm:p-3 md:p-4 lg:p-5">
                <div className="sm:col-span-4 lg:col-span-3 rounded-xl">
                    <GroupInfoCard groupId={groupId} />
                </div>
                <div className="sm:col-span-8 lg:col-span-6 rounded-xl">
                    <GroupPosts groupId={groupId} />
                </div>
                <div className="hidden lg:block lg:col-span-3 rounded-xl">
                    <Admins groupId={groupId} />
                    <div className="my-4"></div>
                    <Members />
                </div>
            </div>
        </>
    )
}

export default GroupPage;
