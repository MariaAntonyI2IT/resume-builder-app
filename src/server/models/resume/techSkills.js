import { Schema } from 'mongoose';

export const techSkillsSchema = new Schema({
    frontEndSkills: {
        type: String,
        required: false,
        unique: false
    },
    backEndSkills: {
        type: String,
        required: false,
        unique: false
    },
    tools: {
        type: String,
        required: false,
        unique: false
    },
    infra: {
        type: String,
        required: false,
        unique: false
    }
});
