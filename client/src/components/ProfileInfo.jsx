
const ProfileInfo = ({ email, about, socialHandles = [], workingAt, status }) => {

    return (
        <div className="p-6 bg-white rounded-xl mb-4 shadow">
            <div className="flex flex-col mb-4">
                <h2 className="font-semibold text-lg text-gray-900">About </h2>
                <p className="text-gray-700 text-base">{about}</p>
            </div>
            {
                status === "Student" ? <></> 
                : 
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-base text-gray-900">Working At </h2>
                    <p className="font-semibold text-blue-500">{workingAt}</p>
                </div> 
            }
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-base text-gray-900">Contact </h2>
                <p className="font-semibold text-blue-500 cursor-pointer hover:underline">{email}</p>
            </div>
            <div className="flex justify-between">
                {
                    socialHandles.length === 0 ? <></>
                    :
                    <>
                        <h2 className="font-semibold text-base text-gray-900">Social Handles </h2>
                        <ul className="font-semibold">
                            {
                                socialHandles.map((link) => {
                                    return (

                                        <li className="text-blue-500 text-base hover:text-blue-400 hover:underline" key={link.url}><a href={link.url} target="_blank">{link.name}</a></li>
                                    )
                                })
                            }
                        </ul>
                    </>
                    
                }
            </div>
            
        </div>
    )
}

export default ProfileInfo;