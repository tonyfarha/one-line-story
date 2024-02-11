import asyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken';
import { User } from "../models/UserModel.js";

export const protect = asyncHandler(async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            const user = await User.findById(decoded.id).select('-password -createdAt -updatedAt -__v')
            if(user) {
                req.user = user;
                next();
            }
            
        } catch (error) {
            console.log(error)
            return res.status(401).json({ msg: 'Not authorized' })
        }
    }

    if (!token || !req.user) {
        return res.status(401).json({ msg: 'Not authorized, no token' })
    }

})


export const isAdmin = asyncHandler((req, res, next) => {

    if (req.user.role !== 'admin') {
        return res.status(401).json({ msg: 'Not authorized' });
    }

    next();

})
