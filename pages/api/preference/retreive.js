import connectMongo from '../../../src/server/utils/db';
import preferenceModel from '../../../src/server/models/preference';

export default async function preference(req, res) {
    try {
        const {
            id
        } = req.body;
        await connectMongo();
        const preference = await preferenceModel.findOne();
        res.json(preference);
    } catch (error) {
        console.log(error), 'preference';
        const errorMsg = error.message ? error.message : error;
        res.status(400).send(errorMsg);
    }
}
