import { useNavigate } from "react-router-dom"
import GroupPage from "../pages/GroupPage"

function GroupCard({ groupId, name, totalMembers, groupLogo }) {
    const navigate = useNavigate();

    return (
        <>
            <div className="px-6 py-3 flex items-center">
                {
                    groupLogo === undefined || groupLogo === "" ?
                        <img className="h-12 w-12 rounded-xl mr-4 object-cover overflow-hidden p-1 bg-slate-200" src="../../group.png" alt="" />
                    :
                        <img className="h-12 w-12 rounded-xl mr-4 object-cover overflow-hidden bg-slate-50" src={ groupLogo } alt="" />
                }
                <div>
                    <h2 className="group-name text-md font-semibold cursor-pointer hover:underline" onClick={() => navigate(`/group/${groupId}`)}>{ name }</h2>
                    <p className="text-gray-400">{ totalMembers } members</p>
                </div>
            </div>
            {/* <hr className="border-gray-300 my-3 mx-5" /> */}
        </>
        
    )
}

export default GroupCard
