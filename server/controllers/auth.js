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
            gradYear,
            branch,
        } = req.body; // Destructuring parameters from req.body. It's all data from the registration form.

        let status = "Student";
        if(gradYear < new Date().getFullYear()) status = "Alumni";

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
            friends,
            branch,
            status,
            workingAt,
            socialHandles,
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
        const user = await User.findOne({ email: email }); // Trying to find user with requested email id

        if(!user) return res.status(500).json({ message: "User not found!"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: "Invalid creditionals!"});

        if(user.status === "Student" && new Date().getFullYear() > user.gradYear) user.status = "Alumni";

        await user.save();

        // If both email and password are correct then,
        // delete user.password; // So that it doesn't get sent back to the front-end. NOTE: WE'RE NOT DELETING IT FROM DATABASE.
        // Mongoose document behaves a bit differently from regular JavaScript objects. Mongoose documents have some special protections and methods, and you can’t delete properties from them in the same way you would with a plain JavaScript object.
        // Therefore first convert mongoose document to javascript object.
        let userObj = user.toObject(); // converts the Mongoose document user into a plain JavaScript object userObj
        delete userObj.password; // deletes the password property from the userObj object

        res.status(200).json({ user: userObj }); // It will send user's information except his password.
    } catch(error) {
        res.status(500).json({error: error.message});
    }
}