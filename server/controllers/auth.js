import bcrypt from "bcrypt"; // To encrypt our password
import User from "../models/User.js"; // User model
import Admin from "../models/Admin.js"; // Admin model

// Register a new user
export const register = async (req, res) => {
    // We're calling mongoDB so it's an async function
    // req we get from frontend and res is the response we're going to send to frontend
    try {
        const {
            firstName, 
            lastName, 
            email, 
            password,
            picturePath,
            headline,
            about,
            skillSet,
            gradYear,
            connections,
            workingAt
        } = req.body; // Destructuring parameters from req.body. It's all data from the registration form.

        // Encrypting the password
        const salt = await bcrypt.genSalt(); // Creating random salt
        const passwordHash = await bcrypt.hash(password, salt); // Hashing password and salt

        // Saving new user's information in database
        const newUser = new User({
            firstName, 
            lastName, 
            email, 
            password: passwordHash,
            picturePath,
            headline,
            about,
            skillSet,
            gradYear,
            connections,
            workingAt,
            viewedProfile: 0,
            impressions: 0
        });

        // Saving new user in database
        const savedUser = await newUser.save(); // This function will return all the fields of document. (It will also includes properties added by mongodb and mongoose by default. Ex- _id for unique identity, _v for version)
        res.status(201).json("Registration Successfull!");
    } catch(error) {
        res.status(500).json({error: error.message}); // Registration failed 
    }
}

// Register Admins
export const adminRegistration = async (req, res) => {
    try {
        const adminFound = await Admin.findOne({ user: req.params.userId });
        const isAdminFound = adminFound ? true : false;

        if(!isAdminFound) {
            // If that user isn't an admin then he can be registered as an admin
            const admin = new Admin({
                user: req.params.userId
            });

            await admin.save();
            res.status(200).json(`Successfully registered ${req.params.userId} as an Admin.`);
        } else {
            // If that specific user is already registered as an admin then he will not register once again as an admin
            res.json(`This user is already registered as an admin.`);
        }
        
    } catch(error) {
        res.status(500).json({error: error.message}); // Registration failed 
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email }); // Trying to find user with requested email id

        if(!user) return res.status(500).json({ message: "User not found!"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: "Invalid creditionals!"});

        // If both email and password are correct then,
        delete user.password; // So that it doesn't get sent back to the front-end. NOTE: WE'RE NOT DELETING IT FROM DATABASE.

        const admin = await Admin.findOne({ user: user._id }); // In admin schema we've used user
        const isAdmin = admin ? true : false; // If any document matches with user._id in admin then it's an admin otherwise it's a normal user.

        res.status(200).json({ user, isAdmin }); // It will send user's information except his password.
    } catch(error) {
        res.status(500).json({error: error.message});
    }
}