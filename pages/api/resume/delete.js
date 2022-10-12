
import connectMongo from '../../../src/server/utils/db';
import ResumeModel from '../../../src/server/models/resume';

export default async function deleteDoc(req, res) {
  try {
    const {
      id
    } = req.body;
    await connectMongo();
    const resume = await ResumeModel.findOneAndRemove({
      _id: id
    });
    res.send(resume);
  } catch (error) {
    console.log(error), 'deleteDoc';
    const errorMsg = error.message ? error.message : error;
    res.status(400).send(errorMsg);
  }
}
