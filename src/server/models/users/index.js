import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: false
    },
    userId: {
        type: String,
        required: true,
        unique: false
    }
}, { collection: 'user_details' });

const userModel = models['user_details'] || model('user_details', userSchema);

export default userModel;
