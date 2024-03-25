import Group from "../models/Group.js";

export const getGroupPosts = async(req, res) => {
    try {
        const { groupId } = req.params;
        const groupPosts = await Group.find()
        
    } catch(error) {
        res.status(500).json({ message: "Can't get all groups"});
    }
}