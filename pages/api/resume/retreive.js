
import connectMongo from '../../../src/server/utils/db';
import resumeModel from '../../../src/server/models/resume';

export default async function retreive(req, res) {
  try {
    const {
      id
    } = req.body;
    await connectMongo();
    const resume = await resumeModel.find({
      _id: id
    });
    res.json(resume[0]);
  } catch (error) {
    console.log(error), 'retreive';
    const errorMsg = error.message ? error.message : error;
    res.status(400).send(errorMsg);
  }
}
