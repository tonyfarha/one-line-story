import express from 'express';
import { protect } from '../../../../middlewares/AuthMiddleware.js';
import { createStory, getStories, getStory, updateStory, deleteStory, addSentence } from '../../../../controllers/StoryController/index.js';

export const storyRouter = express.Router();

storyRouter.route('/').get(protect, getStories).post(protect, createStory);
storyRouter.route('/:id').get(protect, getStory).put(protect, updateStory).delete(protect, deleteStory);
storyRouter.route('/add-sentence/:id').put(protect, addSentence);
