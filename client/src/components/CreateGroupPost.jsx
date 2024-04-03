import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { setPosts } from "../state";

function CreateGroupPost() {

    const user = useSelector((state) => state.user);
    const group = useSelector(state => state.group);
    const dispatch = useDispatch();
    const [ isPostCreationOn, setIsPostCreationOn ] = useState(false);
    const [ postDescription, setPostDescription ] = useState("");
    const [ isPictureSelected, setIsPictureSelected ] = useState(false);
    const [ picture, setPicture ] = useState(null)

    console.log({postDescription});
    const handlePost = async() => {
        const post = {
            userId: user._id,
            description: postDescription,
            picturePath: isPictureSelected ? picture : ""
        }

        const response = await fetch(`http://localhost:3000/groups/${group._id}/create-post`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' // server might expect the body to be in JSON format. Therefore set this.
            },
            body: JSON.stringify(post)
        });
        const posts = await response.json();

        console.log("create post Posts: ", posts);
        dispatch(setPosts({ posts }));
        setPicture(null);
        setPostDescription("");
        setIsPostCreationOn(false);
    }

    return (
        <div className="p-6 pb-3 bg-white rounded-xl mb-4 shadow">
            <div className={`${isPostCreationOn ? "hidden" : ""}`} >
                <div className="flex justify-between">
                    <div className="relative">
                        <img className="h-12 w-12 rounded-lg border mr-2 object-cover" src={group.groupPicturePath} alt="" />
                        <img className="absolute rounded-full bg-white -right-1 -bottom-4 w-9" src={user.picturePath !== "" ? user.picturePath : "../../user.png"} alt="" />
                    </div>
                    
                    <input className="w-full ml-2 rounded-full p-1 border border-gray-300 cursor-pointer" type="button" value={"Write a Post"} onClick={() => setIsPostCreationOn(true)} />
                </div>
                <div className="flex justify-around text-blue-800 px-3 mt-3">
                    <span className="material-symbols-outlined text-2xl hover:text-blue-400 cursor-pointer">panorama</span>
                    <span className="material-symbols-outlined text-2xl hover:text-blue-400 cursor-pointer">calendar_month</span>
                    <span className="material-symbols-outlined text-2xl hover:text-blue-400 cursor-pointer">newsmode</span>
                </div>
            </div>
            
            {isPostCreationOn && (
                <div className=" bg-white rounded-xl">
                    <div className="flex justify-between">
                        <div className="relative">
                        <img className="h-12 w-12 rounded-lg border mr-2 object-cover" src={group.groupPicturePath} alt="" />
                        <img className="absolute rounded-full bg-white -right-1 -bottom-2 w-9" src={user.picturePath !== "" ? user.picturePath : "../../user.png"} alt="" />
                    </div>
                        <span className="material-symbols-outlined cursor-pointer hover:text-blue-400" onClick={() => setIsPostCreationOn(false)}>close</span>
                    </div>
                    <textarea className="w-full h-36 p-2 mt-4 border border-blue-400 outline-blue-700 rounded-xl" placeholder="What do you want to talk about?" value={postDescription} onChange={(event) => setPostDescription(event.target.value)} ></textarea>
                    <div className="flex justify-around text-blue-800 px-3 mt-2">
                        <span className="material-symbols-outlined text-2xl hover:text-blue-400 cursor-pointer">panorama</span>
                        <span className="material-symbols-outlined text-2xl hover:text-blue-400 cursor-pointer">videocam</span>
                        <span className="material-symbols-outlined text-2xl hover:text-blue-400 cursor-pointer">insert_drive_file</span>
                        <span className="material-symbols-outlined text-2xl hover:text-blue-400 cursor-pointer">article</span>
                    </div>
                    <button className="w-full bg-blue-800 p-2 rounded-xl mt-3 text-white hover:bg-blue-500" onClick={handlePost}>Post</button>
                </div>
            )}
        </div>

    )
}

export default CreateGroupPost