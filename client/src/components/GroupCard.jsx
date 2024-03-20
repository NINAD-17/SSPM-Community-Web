
function GroupCard({ key, name, totalMembers, groupLogo }) {
    console.log("groupcard")
    return (
        <>
            <div className="px-6 py-3 flex items-center">
                <img className="h-12 w-12 rounded-xl mr-4 object-cover overflow-hidden p-1 bg-slate-200" src={groupLogo === undefined || groupLogo === "" ? "../../group.png" : groupLogo } alt="" />
                <div>
                    <h2 className="group-name text-md font-semibold cursor-pointer hover:underline">{ name }</h2>
                    <p className="text-gray-400">{ totalMembers } members</p>
                </div>
            </div>
            {/* <hr className="border-gray-300 my-3 mx-5" /> */}
        </>
        
    )
}

export default GroupCard
