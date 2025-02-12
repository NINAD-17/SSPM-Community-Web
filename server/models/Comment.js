import mongoose, { mongo } from "mongoose";

const CommentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    username: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    replies: [{
        username: {
            type: String,
            required: true
        },
        commentId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        reply: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: new Date().getTime()
        }
    }]
}, { timestamps: true })

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;