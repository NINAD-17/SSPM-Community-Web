import ProfileCard from "../../components/ProfileCard";
import Navbar from "../../components/Navbar";
import CreatePostBox from "../../components/CreatePostBox";
import PostCard from "../../components/PostCard";

const HomePage = () => {
    return (
        <>
            <Navbar />
            <div className="mt-16 bg-blue-100 grid sm:grid-cols-12 max-w-7xl mx-auto gap-3 p-2 sm:p-3 md:p-4 lg:p-5">
                <div className="sm:col-span-4 lg:col-span-3 rounded-xl">
                    {/* Left */}
                    <ProfileCard />
                </div>
                <div className="sm:col-span-8 lg:col-span-6 rounded-xl">
                    {/* Middle */}
                    <CreatePostBox />
                    <hr className="my-3 mx-6 border-gray-300" />
                    <PostCard />
                    <PostCard />
                </div>
                <div className="bg-yellow-500 h-screen hidden lg:block lg:col-span-3 rounded-xl">
                    {/* Right */}
                </div>
            </div>
        </>
    )
}

export default HomePage;