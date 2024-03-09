import ProfileCard from "../../components/ProfileCard";
import Navbar from "../../components/Navbar";
import CreatePostBox from "../../components/CreatePostBox";

const HomePage = () => {
    return (
        <>
            <Navbar />
            <div className="bg-blue-100 grid sm:grid-cols-12 max-w-7xl mx-auto gap-3 p-2 sm:p-3 md:p-4 lg:p-5">
                <div className="bg-blue-500 sm:col-span-4 lg:col-span-3 rounded-xl">
                    {/* Left */}
                    <ProfileCard />
                </div>
                <div className="bg-gray-500 h-screen sm:col-span-8 lg:col-span-6 rounded-xl">
                    {/* Middle */}
                    <CreatePostBox />
                    <hr className="my-3 mx-6 border-gray-300" />
                </div>
                <div className="bg-yellow-500 h-screen sm:hidden lg:block lg:col-span-3 rounded-xl">
                    {/* Right */}
                </div>
            </div>
        </>
    )
}

export default HomePage;