import Post from "../models/Post.js";
import User from "../models/User.js";

// CREATE
export const createPost = async(req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        
        const newPost = new Post({
            userId, 
            firstName: user.firstName,
            lastName: user.lastName,
            description,
            picturePath,
            likes: {},
            comment: []
        });

        await newPost.save(); // Saving new post in database

        const post = await Post.find();  // Once we add the post we need all posts to be returned to the frontend
        res.status(201).json(post);
    } catch(error) {
        res.status(409).json({ message: error.message });
    }
}

// READ
export const getFeedPosts = async(req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserPosts = async(req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ userId }); // Finding all posts of that particular user

        res.status(200).json(posts);
    } catch(error) {
        res.status(400).json({ message: error.message });
    }
}

// UPDATE
export const likePost = async(req, res) => {
    try {
        const { id } = req.params; // Id of particular post
        const { userId } = req.body;

        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId); // It will check in all likes that this particular userId is exist in likes or not // Post liked by particular person

        if(isLiked) {
            post.likes.delete(userId); // It will remove userId-true entry from the map of likes
        } else {
            post.likes.set(userId, true); // It's a map therefore value is stored as UserId-true
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true } // it tells Mongoose to return the new version of the document.
        );

        res.status(200).json(updatedPost);
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}