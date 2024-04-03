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

export const joinOrLeaveGroup = async(req, res) => {
    try {
        const { groupId, userId } = req.params;

        const group = await Group.findById(groupId);
        const isMember = group.members.some(member => member.toString() === userId);

        if(isMember) {
            group.members = group.members.filter(member => member.toString() !== userId);
        } else {
            group.members.push(userId);
        }

        await group.save();

        res.status(200).json(group.members);
    } catch(error) {
        res.status(500).json({error: "something went wrong"});
    }
}

export const getGroupPosts = async(req, res) => {
    try {
        const { groupId } = req.params;
        const populatedGroup = await Group.findById(groupId).populate({
            path: 'groupPosts',
            options: { sort: { 'createdAt': -1 } }
        });
        // const groupPosts = await GroupPost.find({ group: groupId });

        res.status(200).json(populatedGroup.groupPosts);
        
    } catch(error) {
        res.status(500).json({ message: "error"});
    }
}

export const createGroupPost = async(req, res) => {
    try {
        const { groupId } = req.params;
        const { userId, description } = req.body;

        const newPost = new GroupPost({
            userId,
            description,
            likes: {},
            comments: [],
            groupId
        });

        await newPost.save();

        const group = await Group.findById(groupId);
        group.groupPosts.push(newPost._id);
        await group.save();

        const populatedGroup = await Group.findById(groupId).populate({
            path: 'groupPosts',
            options: { sort: { 'createdAt': -1 } }
        });

        res.status(201).json(populatedGroup.groupPosts);
    } catch(error) {
        res.status(500).json({error: "Can't create post"});
    }
}

export const likePost = async(req, res) => {
    try {
        const { postId } = req.params; // Id of particular post and user
        const { userId } = req.body;
        console.log(postId, userId)

        const post = await GroupPost.findById(postId);
        const isLiked = post.likes.get(userId); // It will check in all likes that this particular userId is exist in likes or not // Post liked by particular person

        if(isLiked) {
            post.likes.delete(userId); // It will remove userId-true entry from the map of likes
        } else {
            post.likes.set(userId, true); // It's a map therefore value is stored as UserId-true
        }

        const updatedPost = await GroupPost.findByIdAndUpdate(
            postId,
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

        console.log(postId, userId);
        const post = await GroupPost.findById(postId);
        if(post.userId.toString() !== userId) {
            console.log("postu", post.userId);
            return res.status(403).json({ message: "you're not valid user to remove this post!"})
        }

        // Find the group that the post belongs to
        const group = await Group.findOne({ groupPosts: postId });

        // Remove the post ID from the groupPosts array
        group.groupPosts = group.groupPosts.filter(id => id.toString() !== postId);
        await group.save();

        await GroupPost.deleteOne({ _id: postId });
        // const posts = await Post.find().sort({ createdAt: -1 }); // -1 for decending order
        res.status(200).json({ message: "post deleted" });

    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}