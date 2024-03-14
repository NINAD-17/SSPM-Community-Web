import ProfileCard from "../../components/ProfileCard";
import Navbar from "../../components/Navbar";
import CreatePostBox from "../../components/CreatePostBox";
import Groups from "../../components/Groups";
import { useSelector } from "react-redux";
import Posts from "../../components/Posts";
import FriendsList from "../../components/FriendsList";

const HomePage = () => {
    const { _id } = useSelector((state) => state.user);

    return (
        <>
            <Navbar />
            <div className="mt-16 bg-blue-50 grid sm:grid-cols-12 max-w-7xl mx-auto gap-3 p-2 sm:p-3 md:p-4 lg:p-5">
                <div className="sm:col-span-4 lg:col-span-3 rounded-xl">
                    {/* Left */}
                    <ProfileCard userId={_id} />
                    {/* <FriendsList /> */}
                </div>
                <div className="sm:col-span-8 lg:col-span-6 rounded-xl">
                    {/* Middle */}
                    <CreatePostBox />
                    <hr className="my-3 mx-6 border-blue-400" />
                    <Posts userId={_id} />
                </div>
                <div className="hidden lg:block lg:col-span-3 rounded-xl">
                    {/* Right */}
                    <Groups />
                    <FriendsList userId={_id} />
                </div>
            </div>
        </>
    )
}

export default HomePage;