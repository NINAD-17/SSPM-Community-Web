
function CreatePostBox() {
    return (
        <div className="p-6 pb-3 bg-white rounded-xl">
            <div className="flex justify-between">
                <img className="h-12 w-12 rounded-full mr-2" src="https://media.licdn.com/dms/image/D4D03AQEmLM1-sdclrg/profile-displayphoto-shrink_100_100/0/1686311935075?e=1715212800&v=beta&t=GScHG9iR2mPgwvLQIQNVhzc4TIpni14KY_eoLKWMB3c" alt="" />
                <input className="w-full rounded-full p-1 border border-gray-300 cursor-pointer" type="button" value={"Write a Post"} />
            </div>
            <div className="flex justify-around text-blue-800 px-3 mt-3">
                <span className="material-symbols-outlined text-2xl hover:text-blue-400 cursor-pointer">panorama</span>
                <span className="material-symbols-outlined text-2xl hover:text-blue-400 cursor-pointer">calendar_month</span>
                <span className="material-symbols-outlined text-2xl hover:text-blue-400 cursor-pointer">newsmode</span>
            </div>
        </div>

    )
}

export default CreatePostBox
