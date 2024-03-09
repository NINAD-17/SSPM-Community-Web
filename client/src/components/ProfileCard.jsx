
function ProfileCard() {
    return (
        <>
            <div className="bg-white shadow rounded-xl p-6">
                <img src="https://media.licdn.com/dms/image/D4D03AQEmLM1-sdclrg/profile-displayphoto-shrink_100_100/0/1686311935075?e=1715212800&v=beta&t=GScHG9iR2mPgwvLQIQNVhzc4TIpni14KY_eoLKWMB3c" alt="Profile" className="h-24 w-24 sm:h-20 sm:w-20 rounded-full mx-auto" />
                <h2 className="text-xl font-semibold mt-2 text-center hover:underline sm:text-lg cursor-pointer">Ninad Dhulap</h2>
                <p className="text-md text-center text-gray-600 sm:text-sm">MERN Stack Developer | Passionate about Web Development and Emerging Technologies | Computer Engineering Student</p>
                <hr className="border-blue-400 my-3" />
                <div className="text-md sm:text-sm">
                    <div className="flex justify-between">
                        <p className="">Profile viewers </p>
                        <p>10</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="">Post Impressions </p>
                        <p>100</p>
                    </div>
                    <hr className="border-blue-400 my-3" />
                </div>
            </div>
        </>
    )
}

export default ProfileCard
