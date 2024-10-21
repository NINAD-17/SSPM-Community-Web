import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends, setPost, setPosts } from "../state";
import { calculateTimeAgo } from "../utils/calculateTimeAgo";
import { academicYearCalc } from "../utils/academicYear";

const GroupPostCard = ({ postId,
                        userId,
                        description,
                        picturePath,
                        likes,
                        comments,
                        groupId, }) => {
    // console.log({postId}, {userId});
    // console.log({userId});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => state.user);
    const posts = useSelector((state) => state.posts);
    const [ postUser, setPostUser ] = useState("");
    const loggedInUserId = loggedInUser._id;
    const [ isMoreVertOn, setIsMoreVertOn ] = useState(false);
    const [ isFriend, setIsFriend ] = useState(false);
    // console.log({loggedInUserId});
    const isLiked = likes ? Boolean(likes[loggedInUserId]) : false;
    const likesCount = likes ? Object.keys(likes).length : 0;
    // console.log({likes});

    const updateLike = async() => {
        const response = await fetch(`http://localhost:3000/groups/posts/${postId}/likes`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId })
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    } 

    const patchFriend = async() => {
        const response = await fetch(`http://localhost:3000/users/${loggedInUserId}/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    }

    const deletePost = async () => {
        // console.log("del", {loggedInUserId});
        const response = await fetch(`http://localhost:3000/groups/post/${ postId }/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: loggedInUserId })
        });
        // console.log({groupId});
        // console.log(response);
        if (response.status === 200) {
            const updatedPosts = posts.filter((post) => post._id !== postId)
            dispatch(setPosts({ posts: updatedPosts }))
        }
    } 

    const getUser = async() => {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: "GET"
        });
        const data = await response.json();

        // if(response.status === 404) navigate("/404"); // :( User not found

        // console.log({response}, {data});
        setPostUser(data);
    }

    useEffect(() => {
        getUser();
       setIsFriend(loggedInUser.friends.some((friend) => friend._id === userId)) 
    }, [loggedInUser.friends, userId]);

    return (
        <div className="bg-white p-6 shadow rounded-xl mb-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <img className="h-12 w-12 rounded-full mr-2 object-cover" src={postUser.picturePath === '' || postUser.picturePath === undefined ? "../../user.png" : postUser.picturePath } alt="" />
                    <div className="">
                        <div className="flex items-center">
                            <h2 className="font-semibold text-md hover:underline cursor-pointer" onClick={() => navigate(`/profile/${userId}`)} >{ postUser.firstName } { postUser.lastName } </h2>
                            { 
                            postUser.status === "Student" ? 
                            <span className="text-gray-400 text-sm ml-2 font-normal">{ academicYearCalc(postUser.gradYear)} Year <span className="sm:hidden md:inline-block">of Engineering</span></span>
                            : 
                            <span className="text-gray-400 text-sm ml-2 font-normal">Alumni - {postUser.gradYear}</span>
                            }
                            
                        </div>
                        
                        <p className="text-gray-500 text-sm truncate">{ (postUser.headline)?.length > 35 ? (postUser.headline).slice(0, 35) + "..." : postUser.headline }</p>
                        <p className="text-gray-500 text-xs">{ postUser.createdAt ? calculateTimeAgo(postUser.createdAt) : <></>}</p>
                    </div>
                </div>

                {
                    loggedInUser._id === userId ? (
                        <div className="relative">
                            <div className="cursor-pointer bg-blue-100 rounded-full p-1 hover:bg-blue-400 hover:text-white" onClick={() => setIsMoreVertOn(!isMoreVertOn)}>
                                <span className="material-symbols-outlined text-xl">more_vert</span>
                            </div>
                            {
                                isMoreVertOn ? 
                                    <div className="absolute top-10 right-0 rounded-xl cursor-pointer hover:bg-red-400 hover:text-white bg-blue-100 w-36 py-2" onClick={deletePost}>
                                        <h4 className="text-base text-center">Delete Post</h4>
                                    </div>
                                : <></>
                            }
                            
                        </div>
                    )
                    : (
                        <div onClick={patchFriend} className={`cursor-pointer bg-blue-100 ${isFriend ? "hover:bg-red-400 hover:text-white" : "hover:bg-blue-400 hover:text-white"} rounded-full p-1`} >
                        {
                        isFriend ? (
                            <span className="material-symbols-outlined text-xl">person_remove</span>
                        ) : (
                            <span className="material-symbols-outlined text-xl">person_add</span>
                        )}
                        </div>
                    )
                }
            </div>
            <div className="my-3">
                <div className="description">
                    { description }
                </div>
                {picturePath ? 
                    <div className="post-img my-3 overflow-hidden object-cover w-full">
                        <img className="object-cover rounded-xl" src={picturePath} alt="" />
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
                    <p className="ml-2">0</p>
                </div>
                
                <div className="share">
                    <span className="material-symbols-outlined hover:text-blue-400 cursor-pointer">share</span>
                </div>
            </div>
        </div>
    )
}

export default GroupPostCard;
