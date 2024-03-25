import GroupInfoCard from "../../components/GroupInfoCard";
import Navbar from "../../components/Navbar";

const GroupPage = () => {
    return (
        <>
            <Navbar />
            <div className="mt-16 bg-blue-50 grid sm:grid-cols-12 max-w-7xl mx-auto gap-3 p-2 sm:p-3 md:p-4 lg:p-5">
                <div className="sm:col-span-4 lg:col-span-3 rounded-xl">
                    <GroupInfoCard />
                </div>
                <div className="sm:col-span-8 lg:col-span-6 rounded-xl"></div>
                <div className="hidden lg:block lg:col-span-3 rounded-xl"></div>
            </div>
        </>
    )
}

export default GroupPage;
