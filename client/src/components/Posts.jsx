import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "../state";
import PostCard from "./PostCard";

const Posts = ({ userId, isProfile = false }) => {
    console.log({userId});
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);
    // console.log("redux posts: ", posts);
    
    const getfeedPosts = async() => {
        const response = await fetch(`http://localhost:3000/posts`, {
            method: "GET"
        });
        const feedPosts = await response.json();
        // console.log({feedPosts})

        dispatch(setPosts({ posts: feedPosts }));
    }

    const getUserPosts = async() => {
        const response = await fetch(`http://localhost:3000/posts/${userId}/posts`, {
            method: "GET"
        });
        const userPosts = await response.json();
        console.log({userPosts});

        dispatch(setPosts({ posts: userPosts }));
    }

    useEffect(() => {
        if(!isProfile) {
            getfeedPosts();
            console.log("feed posts called")
        } else {
            getUserPosts();
            console.log("user posts called")
        }
    }, []);

    // console.log({posts})

    return (
        <div className="mt-4">
            {   
                posts.length === 0 ? 
                <>
                    <div className="w-full bg-white rounded-xl text-center p-10 mt-4 shadow">
                        <img className="mx-auto my-auto w-80" src="../../postNotFound.png" alt="" />
                        <h2 className="text-gray-300 font-semibold text-2xl">Don't have any posts</h2>
                    </div>
                </> :
                posts.map(
                    ({
                        _id,
                        userId,
                        // firstName,
                        // lastName,
                        description,
                        picturePath,
                        // userPicturePath,
                        likes,
                        createdAt
                        // comments,
                    }) => (
                        <PostCard 
                            key={_id} // unique key --> Remember to use unique key while using loops in react 
                            postId={_id}
                            userId={userId}
                            // name={`${firstName} ${lastName}`}
                            description={description}
                            picturePath={picturePath}
                            // userPicturePath={userPicturePath}
                            likes={likes}
                            createdAt={createdAt}
                            // comments={comments}
                        />
                    )
                )
            }
        </div>
    )
}

export default Posts;
