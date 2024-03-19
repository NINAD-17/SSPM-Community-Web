import Group from "../models/Group.js";


// Create a group
export const createGroup = async (req, res) => {
    try {
        const { groupName, groupDescription, groupAdmin } = req.body; // Group Admin will be the one who create this group. Later on we can add or remove admins.

        const newGroup = new Group({
            name: groupName,
            description: groupDescription,
            admins: [ groupAdmin ]
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