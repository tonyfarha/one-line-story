import asyncHandler from "express-async-handler";
import { Story } from "../../models/StoryModel.js";
import { io } from "../../app.js";
import { getRandomSentence } from "./helper-functions.js";

// @desc    Create new story
// @route   POST /api/v1/stories
// @access  Private
export const createStory = asyncHandler(async (req, res) => {
    const { title, amountOfSentences, topic } = req.body;

    if (!title || !amountOfSentences) {
        return res.status(400).json({ msg: 'Please add all fields' });
    }

    if (amountOfSentences < 1) {
        return res.status(400).json({ msg: 'Invalid story data' });
    }

    // Create story
    const story = await Story.create({
        sid: Date.now(),
        title,
        amountOfSentences,
        topic,
        createdFrom: req.user.id
    });

    if (story) {
        io.sockets.emit('refresh-stories');
        return res.status(201).json({ msg: 'Story created successfully' });
    } else {
        return res.status(400).json({ msg: 'Invalid story data' });
    }
})

// @desc    Get stories
// @route   GET /api/v1/stories
// @access  Private
export const getStories = asyncHandler(async (req, res) => {

    const stories = await Story.find({}).populate({ path: 'createdFrom', select: 'firstname lastname' });

    if (stories) {
        return res.status(200).json(stories);
    }

    return res.status(500).json({ msg: "Try again later" });

})

// @desc    Get story
// @route   GET /api/v1/stories/:id
// @access  Private
export const getStory = asyncHandler(async (req, res) => {

    const id = req.params.id;

    if (!id) return res.status(400).json({});

    const story = await Story.findById(id).populate({
        path: 'sentences.createdFrom',
    });
    
    for (let i = 0; i < story.sentences.length - 1; i++) {
        
        const sentence = story.sentences[i];

        if((sentence.createdFrom.id !== req.user.id) && story.status !== 'completed') {
            sentence.content = 'Nice try! ' + getRandomSentence();
        }
        
    }

    if (!story) {
        return res.status(400).json({ msg: "Story doesn't exist" });
    } else {
        return res.status(200).json(story);
    }

})

// @desc    Update story
// @route   PUT /api/v1/stories/:id
// @access  Private
export const updateStory = asyncHandler(async (req, res) => {
    const { title, amountOfSentences, topic } = req.body;

    const id = req.params.id;

    if (!id) return res.status(400).json({});

    if (!title || !amountOfSentences) {
        return res.status(400).json({ msg: 'Please add all fields' });
    }

    if (amountOfSentences < 1) {
        return res.status(400).json({ msg: 'Invalid story data' });
    }

    // Update story
    const updated = await Story.findOneAndUpdate({ _id: id }, {
        title,
        amountOfSentences,
        topic
    });

    if (updated) {
        return res.status(200).json({ msg: 'Story updated successfully' });
    } else {
        return res.status(400).json({ msg: 'Invalid story data' });
    }
})

// @desc    Delete story
// @route   DELETE /api/v1/stories/:id
// @access  Private
export const deleteStory = asyncHandler(async (req, res) => {

    const id = req.params.id;

    if (!id) return res.status(400).json({});

    await Story.deleteOne({ _id: id });

    io.sockets.emit('refresh-stories');

    return res.status(200).json({ msg: 'Story deleted successfully' });

})

// @desc    Add a sentence to story
// @route   PUT /api/v1/stories/add-sentence/:id
// @access  Private
export const addSentence = asyncHandler(async (req, res) => {
    const { sentence } = req.body;

    if (!sentence) {
        return res.status(400).json({ msg: 'Please add a sentence' });
    }

    const id = req.params.id;

    if (!id) return res.status(400).json({});

    const story = await Story.findById(id).populate({
        path: 'sentences.createdFrom',
    });

    if (!story) {
        return res.status(400).json({ msg: "Story doesn't exist" });
    }

    if (story.sentences.length === story.amountOfSentences) {
        return res.status(400).json({ msg: 'You have exceeded the max amount of sentences' });
    }

    const lastSentence = story.sentences.slice(-1)[0];
    if (lastSentence && lastSentence.createdFrom.id === req.user.id) {
        return res.status(400).json({ msg: 'Adding multiple sentences in a row is not allowed' });
    }

    const newSentences = [
        ...story.sentences,
        {
            content: sentence,
            createdFrom: req.user.id
        }
    ];

    let newStatus = story.status;

    if (newSentences.length === story.amountOfSentences) {
        newStatus = 'completed';
    }

    // Update story
    const updated = await Story.findOneAndUpdate({ _id: id }, {
        sentences: newSentences,
        status: newStatus
    });

    if (updated) {

        if (newStatus === 'completed') {
            io.sockets.emit('refresh-stories');
        }

        io.sockets.emit(`refresh${story.sid}`);

        return res.status(200).json({ msg: 'Your sentence has been added successfully' });
    } else {
        return res.status(400).json({ msg: 'Invalid data' });
    }

})
