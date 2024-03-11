import ProfileCard from "../../components/ProfileCard";
import Navbar from "../../components/Navbar";
import Posts from "../../components/Posts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
    const [ user, setUser ] = useState(null);
    const { userId } = useParams();

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
            <div className="mt-16 sm:mx-12 md:mx-36 lg:mx-56 xl:mx-64 bg-blue-50 grid sm:grid-cols-12 max-w-7xl gap-3 p-2 sm:p-3 md:p-4 lg:p-5">
                <div className="sm:col-span-4 rounded-xl">
                    <ProfileCard userId={userId} />
                </div>
                <div className="sm:col-span-8">
                    <Posts userId={userId} isProfile={true} />
                </div>
            </div>
        </>
    )
}

export default ProfilePage;