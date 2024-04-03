import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        min: 2,
        max: 50
    },
    description: {
        type: String,
        required: true,
        max: 400
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    groupPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "GroupPost"
    }],
    groupPicturePath: {
        type: String,
        default: ""
    },
}, {timestamps: true});

const Group = mongoose.model("Group", GroupSchema);
export default Group;