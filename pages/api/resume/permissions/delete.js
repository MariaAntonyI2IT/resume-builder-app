import connectMongo from '../../../../src/server/utils/db';
import ResumeModel from '../../../../src/server/models/resume';

export default async function deleteDoc(req, res) {
  try {
    const {
      id,
      aid
    } = req.body;
    await connectMongo();
    const permission = await ResumeModel.update({ _id: id }, {
      $pull: {
        permissions: {
          _id: {
            $in: aid
          }
        }
      }
    });
    res.send(permission);
  } catch (error) {
    console.log(error), 'deleteDoc';
    const errorMsg = error.message ? error.message : error;
    res.status(400).send(errorMsg);
  }
}
