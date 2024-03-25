import Group from "../models/Group.js";
import GroupPost from "../models/GroupPost.js"

// Create a group
export const createGroup = async (req, res) => {
    try {
        const { groupName, groupDescription, groupAdmin, groupPicturePath } = req.body; // Group Admin will be the one who create this group. Later on we can add or remove admins.

        const newGroup = new Group({
            name: groupName,
            description: groupDescription,
            members: [ groupAdmin ],
            admins: [ groupAdmin ],
            groupPicturePath
        });

        const createdGroup = await newGroup.save();
        res.status(200).json({createdGroup});

    } catch(error) {
        res.status(500).json({ message: "Can't create Group"});
    }
}

export const getGroups = async(req, res) => {
    try {
        const allGroups = await Group.find();
        res.status(200).json(allGroups);
    } catch(error) {
        res.status(500).json({ message: "Can't get all groups"});
    }
}

export const getGroupInfo = async(req, res) => {
    const { groupId } = req.params;

    const group = await Group.findById(groupId);
    res.status(200).json(group);
}

export const getGroupPosts = async(req, res) => {
    try {
        const { groupId } = req.params;
        const group = await Group.findById(groupId);
        const groupPosts = group.groupPosts;

        res.status(200).json(groupPosts);
        
    } catch(error) {
        res.status(500).json({ message: "Can't get all groups"});
    }
}

export const likePost = async(req, res) => {
    try {
        const { id } = req.params; // Id of particular post
        const { userId } = req.body;

        const post = await GroupPost.findById(id);
        const isLiked = post.likes.get(userId); // It will check in all likes that this particular userId is exist in likes or not // Post liked by particular person

        if(isLiked) {
            post.likes.delete(userId); // It will remove userId-true entry from the map of likes
        } else {
            post.likes.set(userId, true); // It's a map therefore value is stored as UserId-true
        }

        const updatedPost = await GroupPost.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true } // it tells Mongoose to return the new version of the document.
        );

        res.status(200).json(updatedPost);
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

export const deletePost = async(req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;

        const post = await GroupPost.findById(postId);
        if(post.userId !== userId) {
            res.status(403).json({ message: "you're not valid user to remove this post!"})
        }

        await GroupPost.deleteOne({ _id: postId });
        // const posts = await Post.find().sort({ createdAt: -1 }); // -1 for decending order
        res.status(200).json({ message: "post deleted" });

    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}