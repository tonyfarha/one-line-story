import express from 'express';
import { protect, isAdmin } from '../../../../middlewares/AuthMiddleware.js';
import { createUser, loginUser, getCurrentUser, getUsers, getUser, updateUser, deleteUser } from '../../../../controllers/UserController/index.js';

export const userRouter = express.Router();

userRouter.route('/').get(protect, isAdmin, getUsers).post(protect, isAdmin, createUser);
userRouter.route('/current').get(protect, getCurrentUser);
userRouter.route('/:id').get(protect, isAdmin, getUser).put(protect, isAdmin, updateUser).delete(protect, isAdmin, deleteUser);
userRouter.route('/login').post(loginUser);
