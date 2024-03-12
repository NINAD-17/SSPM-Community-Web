import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPost } from "../state";

function PostCard({ postId, userId, name, description, picturePath, userPicturePath, likes }) {
    console.log({postId}, {userId});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggedInUserId = useSelector((state) => state.user._id);
    console.log({loggedInUserId});
    const isLiked = Boolean(likes[loggedInUserId]);
    const likesCount = Object.keys(likes).length;
    console.log({likes});

    const updateLike = async() => {
        const id = postId;
        const response = await fetch(`http://localhost:3000/posts/${id}/likes`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId })
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    }

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
                    <span className={`material-symbols-outlined hover:text-blue-400 cursor-pointer ${isLiked ? "text-blue-400" : ""}`} onClick={updateLike}>thumb_up</span>
                    <p className="ml-2">{likesCount}</p>
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
