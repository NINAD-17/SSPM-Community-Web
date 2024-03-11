import { useState } from "react"
import { useNavigate } from "react-router-dom";

function PostCard({ _id, userId, name, description, picturePath, userPicturePath, likes }) {

    const navigate = useNavigate();
    const [ isLike, setIsLike ] = useState(false);
    console.log({likes});

    return (
        <div className="bg-white p-6 shadow rounded-xl mb-4">
            <div className="flex items-center space-x-2">
                <img className="h-12 w-12 rounded-full mr-2 object-cover" src={userPicturePath ? userPicturePath : "../../user.png"} alt="" />
                <div>
                    <h2 className="font-semibold text-md hover:underline cursor-pointer" onClick={() => navigate(`/profile/${userId}`)} >{ name }</h2>
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
                <div className="likes flex justify-between items-center">
                    <span className={`material-symbols-outlined hover:text-blue-400 cursor-pointer ${isLike ? "text-blue-400" : ""}`} onClick={() => setIsLike(isLike ? false : true)}>thumb_up</span>
                    <p className="ml-2">{likes}</p>
                </div>
                <div className="likes flex justify-between items-center">
                    <span className="material-symbols-outlined hover:text-blue-400 cursor-pointer">comment</span>
                    <p className="ml-2">77</p>
                </div>
                
                <div className="share">
                    <span className="material-symbols-outlined hover:text-blue-400 cursor-pointer">share</span>
                </div>
            </div>
        </div>
    )
}

export default PostCard
