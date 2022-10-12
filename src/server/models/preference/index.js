import { Schema, model, models } from 'mongoose';
import { pageMarginSchema } from './pageMargin';

const preferenceSchema = new Schema({
    logo: {
        type: String,
        required: true,
        unique: false
    },
    pageMargin: pageMarginSchema
}, { collection: 'preference_details' });

const preferenceModel = models['preference_details'] || model('preference_details', preferenceSchema);

export default preferenceModel;
