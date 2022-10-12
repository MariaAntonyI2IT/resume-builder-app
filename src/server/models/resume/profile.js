import { Schema } from 'mongoose';

export const profileSchema = new Schema({
    name: {
        type: String,
        required: false,
        unique: false
    },
    avatar: {
        type: String,
        required: false,
        unique: false
    },
    exp: {
        type: Number,
        required: false,
        unique: false
    },
    designation: {
        type: String,
        required: false,
        unique: false
    },
    mail: {
        type: String,
        required: false,
        unique: false
    },
    description: {
        type: String,
        required: false,
        unique: false
    }
});