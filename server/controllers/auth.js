import bcrypt from "bcrypt"; // To encrypt our password
import User from "../models/User.js"; // User model

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
            workingAt,
            viewedProfile,
            impressions
        } = req.body; // Destructuring parameters from req.body. It's all data from the registration form.

        // Encrypting the password
        const salt = await bcrypt.genSalt(); // Creating random salt
        const passwordHash = await bcrypt.hash(password, salt); // Hashing password and salt

        // Saving new user's information in database
        const newUser = new User({
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

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }); // Trying to find user with requested email id

        if(!user) return res.status(500).json({ message: "User not found!"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: "Invalid creditionals!"});

        // If both email and password are correct then,
        delete user.password; // So that it doesn't get sent back to the front-end. NOTE: WE'RE NOT DELETING IT FROM DATABASE.

        res.status(200).json({ user }); // It will send user's information except his password.
    } catch(error) {
        res.status(500).json({error: error.message});
    }
}