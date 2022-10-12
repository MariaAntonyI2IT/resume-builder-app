import { Schema } from 'mongoose';

export const projectSchema = [new Schema({
    name: {
        type: String,
        required: false,
        unique: false
    },
    startDate: {
        type: String,
        required: false,
        unique: false
    },
    endDate: {
        type: String,
        required: false,
        unique: false
    },
    desc: {
        type: String,
        required: false,
        unique: false
    }
})];
