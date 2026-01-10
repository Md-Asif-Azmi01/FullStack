const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt =  	require('jsonwebtoken');
const task = require('../model/task');
const register = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        console.log(username, email, password);
        if(!username || !email || !password){
           return res.status(400).json({error:"please fill all the field"});
        }

        const checkUser = await User.findOne({ $or:[{username}, {email}] });
        if(checkUser){
            return res.status(400).json({error:"Username or email already exists"});
        }else{
            const hashpaas = await bcrypt.hash(password, 10);
            const newUser = new User({username, email, password:hashpaas});
            await newUser.save();
            return res.status(200).json({message:"User registered successfully"});
        }

    } catch (error) {
        return res.status(404).json({error: "internal server error"});
    }
}

const login  = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
              return res.status(400).json({error:"please fill all the field"});
        }
        const checkuser = await User.findOne({email});
        if(!checkuser){
            return res.status(400).json({error:"User not exists"});
        }
        const isPasswordValid = await bcrypt.compare(password, checkuser.password);
        if(isPasswordValid){
            const token = jwt.sign({id:checkuser._id, email:checkuser.email}, process.env.JWT_SECRET, {expiresIn:'30d'});
            res.cookie('taskmanagercookie', token, {
                httpOnly: true,
                maxAge: 30*24*60*60*1000,
                secure: false, // Set to false for localhost development
                sameSite: 'lax', // Use 'lax' for development
            })
            return res.status(200).json({message:"login successful", token});
        }else{
            return res.status(400).json({error:"invalid credentials"});
        }
        
    } catch (error) {
        return res.status(500).json({error: "internal server error"});
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('taskmanagercookie', {httpOnly: true});
        res.json({message: "logout successful"});
    }catch (error) {
        return res.status(500).json({error: "internal server error"});
    }
}

const userDetails = async (req, res) => {
    try {
        const {user} = req;
        const getdetails = await User.findById(user._id)
        .populate("tasks")
        .select("-password");
        if(getdetails){
            const alltask = getdetails.tasks;
            let yetToStart = [];
            let inProgress = [];
            let completed = [];
            alltask.map(item => {
                if(item.status === 'yetToStart'){
                    yetToStart.push(item);
                }else if(item.status === 'inprogress'){
                    inProgress.push(item);
                }else if(item.status === 'completed'){
                    completed.push(item);   
                }
            });
            return res.status(200).json({success:"success", tasks:[{yetToStart,inProgress,completed}]})
        }
    }catch(err){
        return res.status(404).json({err:"internal server error"});
    }
}

module.exports = {
    register,
    login,
    logout,
    userDetails

};