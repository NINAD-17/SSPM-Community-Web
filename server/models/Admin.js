import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    permissions: {
        type: Array,
        default: ["deletePost", "createGroup", "deleteUser"]
    }
}, { timeseries: true });

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;