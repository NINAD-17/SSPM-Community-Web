import User from "../models/User.js";

// READ
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        delete user.password;
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error.message, msg: "User not found!" });
    }
};

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map(id => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, picturePath, headline}) => (
               { _id, firstName, lastName, picturePath, headline }
            )
        )
        res.status(200).json(formattedFriends)
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

// UPDATE 
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((fId) => fId !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, picturePath }) => {
                return { _id, firstName, lastName, picturePath };
            });

        res.status(200).json(formattedFriends);
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateProfile = async(req, res) => {
    const { _id } = req.params;
    try {
        const { _id } = req.params;
        console.log(_id)
        const { picturePath, headline, about } = req.body;

        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found', _id });
        }

        user.picturePath = picturePath;
        user.headline = headline;
        user.about = about;

        const userUpdate = await user.save();
        res.status(200).json({userUpdate, _id});
    } catch(error) {
        res.status(500).json({ message: 'An error occurred while updating the profile', id: id });
    }
}