import { store } from '../../index';
import { updateAvatar, updateDesc, updateExp, updateMail, updateName, updateRole } from '../../profile';
import { updateBackEndSkills, updateFrontEndSkills, updateInfra, updateTools } from '../../techSkills';
import { updateCollege, updateCourse, updateLocation, updateStream } from '../../academics';
import { updateTitle, updateSelectedForm, updateSelectedId, updateDraft } from '../../common';
import { updateProject } from '../../projects';

const dispatch = store.dispatch;

const populateProfile = (profile = {}) => {
    dispatch(updateAvatar({ value: profile.avatar || '', isValid: true }));
    dispatch(updateDesc({ value: profile.description || '', isValid: true }));
    dispatch(updateExp({ value: profile.exp || '', isValid: true }));
    dispatch(updateMail({ value: profile.mail || '', isValid: true }));
    dispatch(updateName({ value: profile.name || '', isValid: true }));
    dispatch(updateRole({ value: profile.designation || '', isValid: true }));
}

const populateTechSkills = (techSkills = {}) => {
    dispatch(updateBackEndSkills({ value: techSkills.backEndSkills || '', isValid: true }));
    dispatch(updateFrontEndSkills({ value: techSkills.frontEndSkills || '', isValid: true }));
    dispatch(updateInfra({ value: techSkills.infra || '', isValid: true }));
    dispatch(updateTools({ value: techSkills.tools || '', isValid: true }));
}

const populateAcademics = (academics = {}) => {
    dispatch(updateCourse({ value: academics.course || '', isValid: true }));
    dispatch(updateStream({ value: academics.stream || '', isValid: true }));
    dispatch(updateCollege({ value: academics.college || '', isValid: true }));
    dispatch(updateLocation({ value: academics.location || '', isValid: true }));
}

const populateProjects = (projects) => {
    const projectProps = ['name', 'startDate', 'endDate', 'desc'];
    if (!projects) {
        projects = {}
        projectProps.forEach((props) => {
            projects[props] = '';
        });
        projects['expanded'] = true;
        projects = [projects];
    }
    const fProject = projects.map((project) => {
        let obj = {};
        projectProps.forEach((prop) => {
            obj[prop] = { value: project[prop] || '', isValid: true };
        });
        obj['expanded'] = !!project['expanded'];
        return obj;
    })
    dispatch(updateProject(fProject));
}

export const getTitle = (resumeList, name = 'Untitled Resume') => {
    let num = -1;
    resumeList.map((list) => {
        const title = list.title;
        let count = -1;
        if (title.includes(name)) {
            if (title == name) {
                count = 0;
            } else {
                const regex = new RegExp(`${name} \\((.*)\\)`)
                let match = title.match(regex);
                if (match && match[1] && Number(match[1]) != NaN) {
                    count = Number(match[1]);
                } else {
                    count = -1;
                }
            }
        }
        if (count > num) num = count;
    });
    return `${name}${num != -1 ? ` (${num + 1})` : ''}`;
}

export const populateFields = ({ profile, techSkills, academics, projects, title = 'Untitled Resume', id = '', draft = false }) => {
    dispatch(updateSelectedId(id));
    dispatch(updateDraft(draft));
    dispatch(updateTitle({ value: title, isValid: true }));
    dispatch(updateSelectedForm('profile'));
    populateProfile(profile);
    populateTechSkills(techSkills);
    populateAcademics(academics);
    populateProjects(projects);
};
