const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
//sign in 
router.post("/register", async (req,res)=>{
    try{
        const { email, username, password } = req.body;
        const hashpassword =  bcrypt.hashSync(password, 10);
        const user = new User({email, username, password: hashpassword});
        await user.save().then(() =>
            res.status(200).json({user: user})
        );
    } catch(error){
        res.status(400).json({message: "User Already Exists"});
    }
})

router.post("/signin", async (req,res)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            res.status(400).json({message:"please sign up first"});
        }
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if(!isPasswordCorrect){
            res.status(400).json({message:"Password is not correct"});
        }
        const {password, ...others} = user._doc; //user ke doc me se password chhodke sab dede 
        res.status(200).json({others});
    } catch(error){
        res.status(400).json({message: "User Already Exists"});
    }
})
module.exports = router;