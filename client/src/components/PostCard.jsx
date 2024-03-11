
function PostCard({ _id, userId, name, description, picturePath, userPicturePath }) {
    return (
        <div className="bg-white p-6 shadow rounded-xl mb-4">
            <div className="flex items-center space-x-2">
                <img className="h-12 w-12 rounded-full mr-2 object-cover" src={userPicturePath ? userPicturePath : "../../user.png"} alt="" />
                <div>
                    <h2 className="font-semibold text-md hover:underline cursor-pointer">{ name }</h2>
                    <p className="text-gray-500 text-sm">7 hr</p>
                </div>
            </div>
            <div className="my-3">
                <div className="description">
                    { description }
                </div>
                {picturePath ? 
                    <div className="post-img my-3 overflow-hidden">
                        <img className="rounded object-cover" src={picturePath} alt="" />
                    </div>
                    : <></>
                }
                
            </div>
            <div className="bottom-icons flex justify-between text-blue-800 px-8">
                <div className="likes">
                    <span className="material-symbols-outlined hover:text-blue-400 cursor-pointer">thumb_up</span>
                </div>
                <div className="comments">
                    <span className="material-symbols-outlined hover:text-blue-400 cursor-pointer">comment</span>
                </div>
                <div className="share">
                    <span className="material-symbols-outlined hover:text-blue-400 cursor-pointer">share</span>
                </div>
            </div>
        </div>
    )
}

export default PostCard
