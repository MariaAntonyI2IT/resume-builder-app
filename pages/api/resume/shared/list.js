
import connectMongo from '../../../../src/server/utils/db';
import resumeModel from '../../../../src/server/models/resume';

export default async function list(req, res) {
  try {
    const {
      userId,
      filter = {
        field: 'lastModified',
        asc: false
      },
    } = req.body;

    const filterObj = { [filter.field]: filter.asc ? 1 : -1 };
    await connectMongo();
    const resume = await resumeModel.find({
      permissions: {
        $elemMatch: {
          userId
        }
      }
    }).select({ id: 1, title: 1, draft: 1, userId: 1, permissions: 1, lastModified: 1, lastUpdatedBy: 1 }).sort(filterObj);
    res.json(resume);
  } catch (error) {
    console.log(error), 'list';
    const errorMsg = error.message ? error.message : error;
    res.status(400).send(errorMsg);
  }
}
