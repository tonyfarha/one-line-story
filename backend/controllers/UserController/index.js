import bcrypt from 'bcryptjs';
import asyncHandler from "express-async-handler";
import { User } from "../../models/UserModel.js";
import { generateToken } from './helper-functions.js';

// @desc    Create new user
// @route   POST /api/v1/users
// @access  Private
export const createUser = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password, role } = req.body;

    if (!firstname || !lastname || !email || !password || !role) {
        return res.status(400).json({ msg: 'Please add all fields' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        role
    });

    if (user) {
        return res.status(201).json({ msg: 'User created successfully' });
    } else {
        return res.status(400).json({ msg: 'Invalid user data' });
    }
})

// @desc    Get users
// @route   GET /api/v1/users
// @access  Private
export const getUsers = asyncHandler(async (req, res) => {

    const users = await User.find({}).select('-password -createdAt -updatedAt -__v');

    if (users) {
        return res.status(200).json(users);
    }

    return res.status(500).json({ msg: "Try again later" });

})

// @desc    Get user
// @route   GET /api/v1/users/:id
// @access  Private
export const getUser = asyncHandler(async (req, res) => {

    const id = req.params.id;

    if (!id) return res.status(400).json({});

    const user = await User.findById(id).select('-password -createdAt -updatedAt -__v -_id');

    if (!user) {
        return res.status(400).json({ msg: "User doesn't exist" });
    } else {
        return res.status(200).json(user);
    }

})

// @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Private
export const updateUser = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password, role } = req.body;

    const id = req.params.id;

    if (!id) return res.status(400).json({});

    if (!firstname || !lastname || !email || !role) {
        return res.status(400).json({ msg: 'Please add all fields' });
    }

    const user = await User.findById(id);

    let hashedPassword = user.password;
    if (password.trim() != '') {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
    }

    // Update user
    const updated = await User.findOneAndUpdate({ _id: id }, {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        role
    });

    if (updated) {
        return res.status(200).json({ msg: 'User updated successfully' });
    } else {
        return res.status(400).json({ msg: 'Invalid user data' });
    }
})

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private
export const deleteUser = asyncHandler(async (req, res) => {

    const id = req.params.id;

    if (!id) return res.status(400).json({});

    await User.deleteOne({ _id: id });

    return res.status(200).json({ msg: 'User deleted successfully' });

})

// @desc    Authenticate a user
// @route   POST /api/v1/users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        return res.json({
            _id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            name: `${user.firstname} ${user.lastname}`,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }
})

// @desc    Get current user data
// @route   GET /api/v1/users/current
// @access  Private
export const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(req.user);
})
