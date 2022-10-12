import { Schema } from 'mongoose';

export const permissionSchema = [new Schema({
    userId: {
        type: String,
        required: false,
        unique: false
    },
    providedBy: {
        type: String,
        required: false,
        unique: false
    },
    access: {
        read: {
            type: Boolean,
            required: false,
            unique: false
        },
        update: {
            type: Boolean,
            required: false,
            unique: false
        },
        copy: {
            type: Boolean,
            required: false,
            unique: false
        },
        delete: {
            type: Boolean,
            required: false,
            unique: false
        },
        share: {
            type: Boolean,
            required: false,
            unique: false
        }
    }
})];
