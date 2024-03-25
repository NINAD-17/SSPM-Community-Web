
const GroupInfoCard = () => {
    return (
        <>
            <div className="bg-white shadow rounded-xl p-6 pb-3">
                <img src="https://durableprogramming.com/wp-content/uploads/2023/04/JavaScript-logo.png" alt="Profile" className="h-24 w-24 sm:h-20 sm:w-20 rounded-xl mx-auto object-cover border" />
                <h2 className="text-xl font-semibold mt-2 text-center hover:underline sm:text-lg lg:text-xl cursor-pointer">JavaScript</h2>
                <p className="text-md text-center text-gray-600 sm:text-sm lg:text-base">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum, sapiente?
                </p>
                <hr className="border-blue-400 my-2" />
                <div className="text-base sm:text-sm lg:text-base space-y-0">
                    <div className="flex justify-between">
                        <p className="text-gray-700">Admins </p>
                        <p className="font-semibold text-gray-700">6</p>
                    </div>
                    <div className="flex justify-between flex-wrap">
                        <p className="text-gray-700">Members </p>
                        <p className="font-semibold text-gray-700">100</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-700">Created On</p>
                        <p className="font-semibold text-gray-700"> 2 feb 2022</p>
                    </div>
                    
                </div>
                
            </div>
        </>
    )
}

export default GroupInfoCard;