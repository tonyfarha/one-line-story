import { Schema, model } from "mongoose";

const sentenceSchema = Schema(
    {
        content: {
            type: String,
            required: [true, 'Please add the content of the sentence'],
        },
        createdFrom: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
    },
    {
        timestamps: true,
    }
);

const storySchema = Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a title to the story'],
        },
        amountOfSentences: {
            type: Number,
            required: [true, 'Please add the max amount of sentences'],
        },
        topic: {
            type: String,
            required: false,
        },
        sentences: [{
            type: sentenceSchema,
        }],
        status: {
            type: String,
            enum: ['ongoing', 'completed'],
            default: 'ongoing'
        },
        createdFrom: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true,
    }
);

export const Story = model('Story', storySchema);
