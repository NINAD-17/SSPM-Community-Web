import { useDispatch, useSelector } from 'react-redux'
import FriendCard from './FriendCard'
import { setFriends } from '../state';
import { useEffect } from 'react';

const FriendsList = ({ userId }) => {
    const dispatch = useDispatch();
    const friends = useSelector(state => state.user.friends);
    console.log({friends})

    const getFriends = async() => {
        const response = await fetch(`http://localhost:3000/users/${ userId }/friends`, {
            method: "GET"
        });
        console.log({response});
        const friends = await response.json();
        console.log("Formatted Friends: ", friends);

        dispatch(setFriends({ friends }));
    }

    useEffect(() => {
        getFriends();
    }, []);

    return (
        <>
            <div className="bg-white rounded-xl my-4 py-4 shadow">
            <h1 className="text-lg font-semibold mx-4 mb-2">Friends</h1>
            {   friends ? 
                friends.map((friend) => {
                    // console.log("friends: ", {friends});
                    // console.log("map friends: ", {friend});
                    return (
                    <FriendCard
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        friendPicture={friend.picturePath}
                    />)
                })
                : <></>
            }
        </div>
        </>
    )
}

export default FriendsList
