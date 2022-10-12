import { Schema, model, models } from 'mongoose';
import { profileSchema } from './profile';
import { academicSchema } from './academics';
import { projectSchema } from './projects';
import { permissionSchema } from './permission';
import { techSkillsSchema } from './techSkills';

const resumeSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: false
    },
    userId: {
        type: String,
        required: true,
        unique: false
    },
    lastModified: {
        type: Date,
        required: true,
        unique: false
    },
    lastUpdatedBy: {
        type: String,
        required: true,
        unique: false
    },
    draft: {
        type: Boolean,
        required: false,
        unique: false
    },
    permissions: permissionSchema,
    profile: profileSchema,
    academics: academicSchema,
    projects: projectSchema,
    techSkills: techSkillsSchema
}, { collection: 'resume_details' });

const resumeModel = models['resume_details'] || model('resume_details', resumeSchema);

export default resumeModel;
