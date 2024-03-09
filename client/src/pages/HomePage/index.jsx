import ProfileCard from "../../components/ProfileCard";
import Navbar from "../../components/Navbar";
import CreatePostBox from "../../components/CreatePostBox";
import PostCard from "../../components/PostCard";
import Groups from "../../components/Groups";

const HomePage = () => {
    return (
        <>
            <Navbar />
            <div className="mt-16 bg-blue-50 grid sm:grid-cols-12 max-w-7xl mx-auto gap-3 p-2 sm:p-3 md:p-4 lg:p-5">
                <div className="sm:col-span-4 lg:col-span-3 rounded-xl">
                    {/* Left */}
                    <ProfileCard />
                </div>
                <div className="sm:col-span-8 lg:col-span-6 rounded-xl">
                    {/* Middle */}
                    <CreatePostBox />
                    <hr className="my-3 mx-6 border-blue-400" />
                    <PostCard />
                    <PostCard />
                </div>
                <div className="hidden lg:block lg:col-span-3 rounded-xl">
                    {/* Right */}
                    <Groups />
                </div>
            </div>
        </>
    )
}

export default HomePage;