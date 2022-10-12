
import connectMongo from './../../../src/server/utils/db';
import userModel from './../../../src/server/models/users';

export default async function list(req, res) {
  try {
    await connectMongo();
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    console.log(error), 'list';
    const errorMsg = error.message ? error.message : error;
    res.status(400).send(errorMsg);
  }
}
