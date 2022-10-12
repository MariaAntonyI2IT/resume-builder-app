
import connectMongo from '../../../../src/server/utils/db';
import ResumeModel from '../../../../src/server/models/resume';

export default async function add(req, res) {
  try {
    const {
      users,
      access,
      userId,
      id } = req.body;
    console.log(req.body)
    await connectMongo();
    const permission = await ResumeModel.findOneAndUpdate({ _id: id }, {
      $push: {
        permissions: {
          $each: users.map((user) => {
            return {
              userId: user,
              access,
              providedBy: userId
            }
          })
        }
      }
    });
    res.json(permission);
  } catch (error) {
    console.log(error), 'add';
    const errorMsg = error.message ? error.message : error;
    res.status(400).send(errorMsg);
  }
}
