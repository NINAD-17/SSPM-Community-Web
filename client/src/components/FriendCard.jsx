// import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state";

const FriendCard = ({ friendId, name, friendPicture }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector(state => state.user);
    const friends = useSelector(state => state.user.friends);

    const isFriend = friends.find((friend) => friend._id === friendId);

    const patchFriend = async() => {
        const response = await fetch(`http://localhost:3000/users/${_id}/${friendId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    }

    return (
        <>
            <div className="px-6 py-3 flex items-center">
    <img className="h-12 w-12 rounded-full mr-4 object-cover" src={friendPicture} alt="" />
    <div className="flex items-center justify-between flex-grow">
        <div className="">
            <h2 className="group-name text-md font-semibold cursor-pointer hover:underline" onClick={() => navigate(`/profile/${friendId}`)}>
                {name}
            </h2>
            <p className="text-gray-400">Student</p>
        </div>
        <div className="ml-7 cursor-pointer text-blue-800 hover:text-blue-400" onClick={patchFriend}>
            {isFriend ? (
                <span className="material-symbols-outlined">person_remove</span>
            ) : (
                <span className="material-symbols-outlined">person_add</span>
            )}
        </div>
    </div>
    <hr className="border-gray-300 my-3" />
</div>

        </>
    )
}

export default FriendCard
