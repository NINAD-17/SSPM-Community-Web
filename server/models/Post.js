// Schema for Posts
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    description: String,
    picturePath: String, // Post image
    userPicturePath: String, // Profile image
    likes: {
        type: Map,  // Instead of array use map it's efficient.
        of: Boolean // It checks if the user Id is exists in the map and value is true if it's exist.
    },
    comments: {
        type: Array,
        default: []
    }
}, { timestamps: true });

// NOTE: Search about index in mongodb. Search why --> creating an index can take some time if you have a lot of documents in your collection. It’s usually best to create indexes during periods of low load or during maintenance windows.
// Create an index on the 'createdAt' field
PostSchema.index({ createdAt: -1 }); 

const Post = mongoose.model("Post", PostSchema);
export default Post;