import { Schema, model } from "mongoose";

const userSchema = Schema(
    {
        firstname: {
            type: String,
            required: [true, 'Please add a firstname'],
        },
        lastname: {
            type: String,
            required: [true, 'Please add a lastname'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user'
        }
    },
    {
        timestamps: true,
    }
);

export const User = model('User', userSchema);
