import { useSelector } from "react-redux"

function CreatePostBox() {

    const user = useSelector((state) => state.user);
    console.log("pic: ", typeof user.picturePath);

    return (
        <div className="p-6 pb-3 bg-white rounded-xl">
            <div className="flex justify-between">
                <img className="h-12 w-12 rounded-full mr-2 object-cover" src={user.picturePath !== "" ? user.picturePath : "../../user.png"} alt="" />
                <input className="w-full rounded-full p-1 border border-gray-300 cursor-pointer" type="button" value={"Write a Post"} />
            </div>
            <div className="flex justify-around text-blue-800 px-3 mt-3">
                <span className="material-symbols-outlined text-2xl hover:text-blue-400 cursor-pointer">panorama</span>
                <span className="material-symbols-outlined text-2xl hover:text-blue-400 cursor-pointer">calendar_month</span>
                <span className="material-symbols-outlined text-2xl hover:text-blue-400 cursor-pointer">newsmode</span>
            </div>
        </div>

    )
}

export default CreatePostBox
