import { Schema } from 'mongoose';

export const academicSchema = new Schema({
    course: {
        type: String,
        required: false,
        unique: false
    },
    stream: {
        type: String,
        required: false,
        unique: false
    },
    college: {
        type: String,
        required: false,
        unique: false
    },
    location: {
        type: String,
        required: false,
        unique: false
    }
});
