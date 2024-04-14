import mongoose from "mongoose";
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

export const updateProfile = async (req, res) => {

    try {
        const { id } = req.params;
        const { headline, about, gradYear, status, branch, workingAt, picturePath } = req.body;

        // Find the user and update the document
        const updatedUser = await User.findByIdAndUpdate(id, {
            headline,
            about,
            gradYear,
            status,
            branch,
            workingAt,
            picturePath: `http://localhost:3000/profileImages/${picturePath}`
        }, { new: true }); // 'new: true' returns the updated document

        // // If a new picture was uploaded, update the picturePath
        // if (req.file) {
        //     updatedUser.picturePath = `http://localhost:3000/profileImages/${req.file.originalname}`;
        // }

        // If the user was not found, send a 404 response
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the updated user as the response
        res.status(200).json(updatedUser);
    } catch (error) {
        // If an error occurred, send a 500 response
        res.status(500).json({ message: 'An error occurred while updating the profile', error: error.message });
    }
}
