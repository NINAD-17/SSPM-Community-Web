import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "../state";
// import PostCard from "./PostCard";
import GroupPostCard from "./GroupPostCard";

const GroupPosts = ({ groupId }) => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);
    // console.log("redux posts: ", posts);
    
    const getGroupPosts = async() => {
        const response = await fetch(`http://localhost:3000/groups/${groupId}/posts`, {
            method: "GET"
        });
        const groupPosts = await response.json();
        console.log({groupPosts});

        dispatch(setPosts({ posts: groupPosts }));
    }

    useEffect(() => {
        getGroupPosts();
    }, [groupId]);

    // console.log({posts})

    return (
        <>
            {   posts.length === 0 ? 
                <>
                    <div className="w-full bg-white h-full rounded-xl text-center">
                        <img className="mx-auto my-auto w-80 p-5" src="../../postNotFound.png" alt="" />
                        <h2 className="text-gray-300 font-semibold text-2xl">Don't have any posts</h2>
                    </div>
                </> :
                posts.map(
                    ({
                        _id,
                        userId,
                        description,
                        picturePath,
                        likes,
                        comments,
                        group,
                    }) => (
                        <GroupPostCard 
                            key={_id} // unique key --> Remember to use unique key while using loops in react 
                            postId={_id}
                            userId={userId}
                            description={description}
                            picturePath={picturePath}
                            likes={likes}
                            // comments={comments}
                        />
                    )
                )
            }
        </>
    )
}

export default GroupPosts;
