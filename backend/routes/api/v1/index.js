import express from 'express';
import { userRouter } from './UserRoutes/index.js';

export const v1Router = express.Router();

v1Router.use('/users', userRouter);
