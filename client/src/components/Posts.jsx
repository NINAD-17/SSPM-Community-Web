import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "../state";
import PostCard from "./PostCard";

const Posts = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);
    
    const getfeedPosts = async() => {
        const response = await fetch(`http://localhost:3000/posts`, {
            method: "GET"
        });
        const feedPosts = await response.json();
        console.log({feedPosts})

        dispatch(setPosts({ posts: feedPosts }));
    }

    const getUserPosts = async() => {
        const response = await fetch(`http://localhost:3000/${userId}/posts`, {
            method: "GET"
        });
        const userPosts = await response.json();

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

    console.log({posts})

    return (
        <>
            {
                posts.map(
                    ({
                        _id,
                        userId,
                        firstName,
                        lastName,
                        description,
                        picturePath,
                        userPicturePath,
                        likes,
                        // comments,
                    }) => (
                        <PostCard 
                            key={_id} // unique key --> Remember to use unique key while using loops in react 
                            postId={_id}
                            userId={userId}
                            name={`${firstName} ${lastName}`}
                            description={description}
                            picturePath={picturePath}
                            userPicturePath={userPicturePath}
                            likes={likes.length}
                            // comments={comments}
                        />
                    )
                )
            }
        </>
    )
}

export default Posts;