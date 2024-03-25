
const AdminCard = () => {
    return (
         <>
            <div className="px-6 py-3 flex items-center">
            <img className="h-12 w-12 rounded-full mr-4 object-cover" src="https://media.licdn.com/dms/image/D4D03AQEmLM1-sdclrg/profile-displayphoto-shrink_400_400/0/1686311935075?e=1716422400&v=beta&t=ChWjD-dXOQAbQ5U9wE-iM85U9B8jKtdrqCWQKMUCvPk" alt="" />
            <div className="flex items-center justify-between flex-grow">
            <div className="">
                <h2 className="group-name text-md font-semibold cursor-pointer hover:underline" >
                    Ninad Dhulap
                </h2>
                <p className="text-gray-400">Student</p>
            </div>
            <div className="ml-7 cursor-pointer text-blue-800 hover:text-blue-400" >
                {/* {isFriend ? (
                    <span className="material-symbols-outlined">person_remove</span>
                ) : (
                    <span className="material-symbols-outlined">person_add</span>
                )} */}
            </div>
        </div>
        <hr className="border-gray-300 my-3" />
        </div>

        </>
    )
}

export default AdminCard;