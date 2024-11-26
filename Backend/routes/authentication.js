const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Register API 
router.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashedpassword = bcrypt.hashSync(password)
        
        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        const user = new User({ email, username, password : hashedpassword });
        await user.save();
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});


// LOG IN 

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email : req.body.email})
        if (!user){
            res.status(400).json({ message: "User Already Exists" });
        }
        const isPasswordMatched = bcrypt.compareSync(req.body.password, user.password)
        if (!isPasswordMatched){
            res.status(400).json({ message: "Enter a Valid Password" });
        }
        const {password, ...others} = user._doc 
        res.status(200).json({ others })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
