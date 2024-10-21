import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends, setPost, setPosts } from "../state";
import { calculateTimeAgo } from "../utils/calculateTimeAgo";
import { academicYearCalc } from "../utils/academicYear";
import CommentCard from "./CommentCard";
import { comment } from "postcss";

function PostCard({ postId, userId, description, picturePath, likes, comments, createdAt }) {
    console.log({postId}, {userId});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => state.user);
    const [ postUser, setPostUser ] = useState(null);
    const posts = useSelector((state) => state.posts)
    const loggedInUserId = loggedInUser._id;
    const [ isMoreVertOn, setIsMoreVertOn ] = useState(false);
    const [ isFriend, setIsFriend ] = useState(false);
    const [ isCommentVisible, setIsCommentVisible ] = useState(false);
    // console.log({loggedInUserId});
    const isLiked = Boolean(likes[loggedInUserId]);
    const likesCount = Object.keys(likes).length;
    // console.log({likes});
    const [ commentContent, setCommentContent ] = useState("");

    const getUser = async() => {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: "GET"
        });

        const user = await response.json();
        setPostUser(user);
    }

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
        const response = await fetch(`http://localhost:3000/posts/${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: loggedInUserId })
        });

        // console.log(response);
        if (response.status === 200) {
            const updatedPosts = posts?.filter((post) => post._id !== postId)
            dispatch(setPosts({ posts: updatedPosts }))
        }
    }

    const addComment = async(event) => {
      event.preventDefault();
      if(commentContent.length > 0) {
        
        const commentObj = {
          userId: loggedInUserId,
          comment: commentContent
        }

        const response = await fetch(`http://localhost:3000/posts/${postId}/create-comment`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json' // server might expect the body to be in JSON format. Therefore set this.
          },
          body: JSON.stringify(commentObj)
        });

        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
        setCommentContent("");
      } else {
        console.log("write some content first!");
      }
    }

    useEffect(() => {
        getUser();
        console.log("get user use effect");
       setIsFriend(loggedInUser.friends?.some((friend) => friend._id === userId)) 
    }, [loggedInUser.friends, userId]);

    if(postUser === null) return ;
    // console.log("crate", postUser.createdAt);

    return (
      <div className="bg-white p-6 shadow rounded-xl mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              className="h-12 w-12 rounded-full mr-2 object-cover"
              src={
                postUser.picturePath === "" ||
                postUser.picturePath === undefined
                  ? "../../user.png"
                  : postUser.picturePath
              }
              alt=""
            />
            <div className="">
              <div className="flex items-center">
                <h2
                  className="font-semibold text-md hover:underline cursor-pointer"
                  onClick={() => navigate(`/profile/${userId}`)}
                >
                  {postUser.firstName} {postUser.lastName}{" "}
                </h2>
                {postUser.status === "Student" ? (
                  <span className="text-gray-400 text-sm ml-2 font-normal">
                    {academicYearCalc(postUser.gradYear)} Year{" "}
                    <span className="sm:hidden md:inline-block">
                      of Engineering
                    </span>
                  </span>
                ) : (
                  <span className="text-gray-400 text-sm ml-2 font-normal">
                    Alumni - {postUser.gradYear}
                  </span>
                )}
              </div>

              <p className="text-gray-500 text-sm truncate">
                {postUser.headline?.length > 35
                  ? postUser.headline.slice(0, 35) + "..."
                  : postUser.headline}
              </p>
              <p className="text-gray-500 text-xs">
                {postUser.createdAt ? calculateTimeAgo(createdAt) : <></>}
              </p>
            </div>
          </div>

          {loggedInUser._id === userId ? (
            <div className="relative">
              <div
                className="cursor-pointer bg-blue-100 rounded-full p-1 hover:bg-blue-400 hover:text-white"
                onClick={() => setIsMoreVertOn(!isMoreVertOn)}
              >
                <span className="material-symbols-outlined text-xl">
                  more_vert
                </span>
              </div>
              {isMoreVertOn ? (
                <div
                  className="absolute top-10 right-0 rounded-xl cursor-pointer hover:bg-red-400 hover:text-white bg-blue-100 w-36 py-2"
                  onClick={deletePost}
                >
                  <h4 className="text-base text-center">Delete Post</h4>
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <div
              onClick={patchFriend}
              className={`cursor-pointer bg-blue-100 ${
                isFriend
                  ? "hover:bg-red-400 hover:text-white"
                  : "hover:bg-blue-400 hover:text-white"
              } rounded-full p-1`}
            >
              {isFriend ? (
                <span className="material-symbols-outlined text-xl">
                  person_remove
                </span>
              ) : (
                <span className="material-symbols-outlined text-xl">
                  person_add
                </span>
              )}
            </div>
          )}
        </div>
        <div className="my-3">
          <div className="description">{description}</div>
          {picturePath ? (
            <div className="post-img my-3 overflow-hidden object-cover w-full">
              <img className="rounded-xl object-cover" src={picturePath} alt="" />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="bottom-icons flex justify-between text-blue-800 px-8">
          <div className="likes flex justify-between items-center">
            <span
              className={`material-symbols-outlined hover:text-blue-400 cursor-pointer ${
                isLiked ? "text-blue-400" : ""
              }`}
              onClick={updateLike}
            >
              thumb_up
            </span>
            <p className="ml-2">{likesCount}</p>
          </div>
          <div className="likes flex justify-between items-center">
            <span
              className="material-symbols-outlined hover:text-blue-400 cursor-pointer"
              onClick={() => setIsCommentVisible(!isCommentVisible)}
            >
              comment
            </span>
            <p className="ml-2">{comments.length}</p>
          </div>

          <div className="share">
            <span className="material-symbols-outlined hover:text-blue-400 cursor-pointer">
              share
            </span>
          </div>
        </div>
        {isCommentVisible ? (
          <>
            <div>
              <h3 className="mt-5 ml-2 text-blue-600 font-semibold">
                {" "}
                Add your comment{" "}
              </h3>
              <form onSubmit={addComment}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Start writing...."
                    className="w-full mt-3 py-2 px-4 bg-blue-50 rounded-xl border border-blue-200 focus:outline-blue-100 "
                    value={commentContent}
                    onChange={(event) => setCommentContent(event.target.value)}
                  />
                  <button type="submit" className="absolute top-3 right-0 bg-blue-400 hover:bg-blue-700 py-2 px-4 border rounded-xl text-white">
                    Post
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          ""
        )}

        {isCommentVisible && comments.length > 0 && (
          <>
            <hr className="my-4" />
            <h3 className="text-xl font-semibold text-slate-700 ml-2">
              Comments - {comments.length}
            </h3>
            <div>
              {
                comments.map((comment) => (
                  <CommentCard key={comment._id} postId={postId} comment={comment} />
                ))
              }
            </div>
          </>
        )}
      </div>
    );
}

export default PostCard
