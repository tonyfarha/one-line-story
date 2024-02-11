import express from 'express';

export const userRouter = express.Router();

userRouter.route('/').get((req, res) => res.json({ msg: 'it works!' }));
