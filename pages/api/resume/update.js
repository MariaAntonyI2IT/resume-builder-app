
import connectMongo from '../../../src/server/utils/db';
import resumeModel from '../../../src/server/models/resume';

export default async function update(req, res) {
  try {
    const {
      title,
      profile,
      techSkills,
      academics,
      userId,
      projects,
      draft,
      id } = req.body;
    await connectMongo();
    const resume = await resumeModel.findOneAndUpdate({ _id: id }, {
      $set:
      {
        title,
        draft,
        lastModified: new Date(),
        lastUpdatedBy: userId,
        profile: {
          name: profile.name,
          avatar: profile.avatar,
          exp: profile.exp,
          designation: profile.designation,
          mail: profile.mail,
          description: profile.description
        },
        techSkills: {
          frontEndSkills: techSkills.frontEndSkills,
          backEndSkills: techSkills.backEndSkills,
          tools: techSkills.tools,
          infra: techSkills.infra
        },
        academics: {
          course: academics.course,
          stream: academics.stream,
          college: academics.college,
          location: academics.location
        },
        projects
      }
    });
    res.json(resume);
  } catch (error) {
    console.log(error), 'update';
    const errorMsg = error.message ? error.message : error;
    res.status(400).send(errorMsg);
  }
}
