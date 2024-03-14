import { useDispatch, useSelector } from 'react-redux'
import FriendCard from './FriendCard'
import { setFriends } from '../state';
import { useEffect } from 'react';

const FriendsList = ({ userId }) => {
    const dispatch = useDispatch();
    const friends = useSelector(state => state.user.friends);
    console.log({friends})

    const getFriends = async() => {
        const response = await fetch(`http://localhost:3000/${ userId }/friends`, {
            method: "GET"
        });
        const friends = await response.json();

        dispatch(setFriends({ friends }));
    }

    useEffect(() => {
        getFriends();
    }, []);

    return (
        <>
            <div className="bg-white rounded-xl my-4 py-4">
            <h1 className="text-lg font-semibold mx-4 mb-2">Friends</h1>
            {   friends ? 
                friends.map((friend) => (
                    <FriendCard
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        friendPicture={friend.picturePath}
                    />
                ))
                : <></>
            }
            <FriendCard />
            <FriendCard />
        </div>
        </>
    )
}

export default FriendsList
