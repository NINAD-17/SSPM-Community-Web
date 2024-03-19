import mongoose from "mongoose";

const GroupPostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    description: String,
    picturePath: String, // Post image
    likes: {
        type: Map,  // Instead of array use map it's efficient.
        of: Boolean // It checks if the user Id is exists in the map and value is true if it's exist.
    },
    comments: {
        type: Array,
        default: []
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }
});

const GroupPost = mongoose.model("GroupPost", GroupPostSchema);
export default GroupPost;