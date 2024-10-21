import ProfileCard from "../../components/ProfileCard";
import Navbar from "../../components/Navbar";
import CreatePostBox from "../../components/CreatePostBox";
import Groups from "../../components/Groups";
import { useSelector } from "react-redux";
import Posts from "../../components/Posts";
import FriendsList from "../../components/FriendsList";
import ThreeCard from "../../components/ThreeCard";
import Footer from "../../components/Footer";
 
const HomePage = () => {
    const { _id } = useSelector((state) => state.user);
    const mobContent = useSelector(state => state.mobContent);

    return (
        <>
            <Navbar />
            <div className="mt-16 bg-blue-50 grid sm:grid-cols-12 max-w-7xl mx-auto gap-3 p-2 sm:p-3 md:p-4 lg:p-5">
                <div className="sm:col-span-4 lg:col-span-3 rounded-xl">
                    {/* Left */}
                    <ProfileCard userId={_id} />
                    <div className="hidden sm:block">
                    <Footer />
                    </div>
                    {/* <FriendsList /> */}
                </div>
                <div className="sm:col-span-8 lg:col-span-6 rounded-xl">
                    {/* Middle */}
                    <CreatePostBox />
                    <ThreeCard />
                    <hr className="my-3 mx-6 border-blue-400" />
                    <div className="hidden lg:block">
                        <Posts userId={_id} />
                    </div>

                    <div className="lg:hidden">
                        {
                        (mobContent === "posts") 
                        ? 
                            <Posts userId={_id} />
                        : 
                        mobContent === "friends" 
                        ? 
                            <FriendsList userId={_id} /> 
                        : mobContent === "groups" ?
                            <Groups userId={_id} />
                        : <></>
                    }
                    </div>
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