import { store } from '../../index';

export const getResumeFields = () => {
    const resumeData = store.getState();
    const title = resumeData.common.title.value;
    const userId = resumeData.userProfile.userId;
    const profile = {
        name: resumeData.profile.name.value,
        avatar: resumeData.profile.avatar.value,
        exp: resumeData.profile.exp.value,
        designation: resumeData.profile.role.value,
        mail: resumeData.profile.mail.value,
        description: resumeData.profile.desc.value
    };
    const techSkills = {
        frontEndSkills: resumeData.techSkills.frontEndSkills.value,
        backEndSkills: resumeData.techSkills.backEndSkills.value,
        tools: resumeData.techSkills.tools.value,
        infra: resumeData.techSkills.infra.value
    };

    const academics = {
        course: resumeData.academics.course.value,
        stream: resumeData.academics.stream.value,
        college: resumeData.academics.college.value,
        location: resumeData.academics.location.value
    };

    const projects = resumeData.projects.data.map((data) => {
        return {
            name: data.name.value,
            startDate: data.startDate.value,
            endDate: data.endDate.value,
            desc: data.desc.value
        }
    });

    return {
        title,
        userId,
        profile,
        techSkills,
        academics,
        projects
    };
}