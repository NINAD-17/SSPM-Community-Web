// Schema for Users
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true // Duplicate emails aren't allowed
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    picturePath: {
        type: String,
        default: '' // Image path isn't provided then ''
    },
    headline: {
        type: String,
        max: 200
    },
    about: {
        type: String,
        max: 4000
    },
    skillSet: {
        type: Array
    },
    gradYear: {
        Type: Date
    },
    connections: {
        type: Array,
        default: []
    },
    friends: {
      type: Array,
      default: [],
    },
    branch: String,
    workingAt: String,
    viewedProfile: Number,
    impressions: Number
}, { timestamps: true }); // 'timestamps: true' will give us automatic dates for when it's created and updated

const User = mongoose.model("User", UserSchema); // Creating User collection (table) with the User schema
export default User;