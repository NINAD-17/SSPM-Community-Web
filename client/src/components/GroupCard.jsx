
function GroupCard() {
    return (
        <>
            <div className="px-6 py-3 flex items-center">
                <img className="h-12 w-12 rounded-xl mr-4" src="https://www.computerhope.com/jargon/j/javascript.png" alt="" />
                <div>
                    <h2 className="group-name text-md font-semibold cursor-pointer hover:underline">JavaScript</h2>
                    <p className="text-gray-400">255 members</p>
                </div>
                <hr className="border-gray-300 my-3" />
            </div>
        </>
        
    )
}

export default GroupCard
