const jwt = require('jsonwebtoken');
const user = require('../model/user');

const authMiddleware = async (req, res, next) => {
    try {
        console.log('Auth middleware called, cookies:', req.cookies);
        const token = req.cookies.taskmanagercookie;
        if(!token){
            console.log('No token found in cookies');
            return res.status(401).json({error: "Access denied. No token provided."});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const users = await user.findById(decoded.id);
        if(!users){
            return res.status(401).json({error: "User not found."});
        }
        req.user = users;
        next();
    } catch (error) {
        console.log('Auth error:', error.message);
        return res.status(401).json({error: "Invalid token"});        
    }
}; 

module.exports = authMiddleware;