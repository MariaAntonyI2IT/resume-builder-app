import { Schema } from 'mongoose';

export const pageMarginSchema = new Schema({
    top: {
        type: Number,
        required: true,
        unique: false
    },
    right: {
        type: Number,
        required: true,
        unique: false
    },
    bottom: {
        type: Number,
        required: true,
        unique: false
    },
    left: {
        type: Number,
        required: true,
        unique: false
    }
});
