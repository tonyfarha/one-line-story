import express from 'express';
import { v1Router } from './api/v1/index.js';

export const apiRouter = express.Router();

apiRouter.use('/v1', v1Router);
