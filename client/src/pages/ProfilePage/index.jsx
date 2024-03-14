import ProfileCard from "../../components/ProfileCard";
import Navbar from "../../components/Navbar";
import Posts from "../../components/Posts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FriendsList from "../../components/FriendsList";
import { useSelector } from "react-redux";
import CreatePostBox from "../../components/CreatePostBox";

const ProfilePage = () => {
    const [ user, setUser ] = useState(null);
    const { userId } = useParams();
    const loggedInUser = useSelector(state => state.user);

    const getUser = async() => {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: "GET",
        });
        const data = response.json();

        setUser(data);
    }

    useEffect(() => {
        getUser();
    }, []);

    if(!user) return null;

    return (
        <>
            <Navbar />
            <div className="">
                <div className="mt-16  bg-blue-50 grid sm:grid-cols-12 max-w-7xl gap-3 p-3 sm:p-3 md:p-4 lg:px-24 xl:p-36">
                    <div className="sm:col-span-5 md:col-span-4 rounded-xl">
                        <ProfileCard userId={userId} />
                        {/* <FriendsList userId={userId} /> */}
                    </div>
                    <div className="sm:col-span-7 md:col-span-8">
                        { userId === loggedInUser._id ? <CreatePostBox /> : <></> }
                        <Posts userId={userId} isProfile={true} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;