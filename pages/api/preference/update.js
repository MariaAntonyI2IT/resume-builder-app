
import connectMongo from '../../../src/server/utils/db';
import preferenceModel from '../../../src/server/models/preference';

export default async function update(req, res) {
  try {
    const {
      logo,
      pageMargin,
      id } = req.body;
    await connectMongo();
    const preference = await preferenceModel.findOneAndUpdate({ _id: id }, {
      $set:
      {
        logo,
        pageMargin
      }
    });
    res.json(preference);
  } catch (error) {
    console.log(error), 'update';
    const errorMsg = error.message ? error.message : error;
    res.status(400).send(errorMsg);
  }
}
