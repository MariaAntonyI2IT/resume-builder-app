import { store } from './../../../../store';
import { updateProject } from '../../../../store/projects';

export const validateForm = () => {
    const dispatch = store.dispatch;
    const state = store.getState().projects;
    let pList = JSON.parse(JSON.stringify(state.data));
    const projectProps = ['name', 'startDate', 'endDate', 'desc'];
    let isValid = true;
    pList.forEach((project, index) => {
        projectProps.forEach((prop) => {
            let { value } = project[prop];
            if (!value) {
                project[prop].isValid = false;
                isValid = false;
            } else {
                project[prop].isValid = true;
            }
        });
    });
    if (!pList.length) isValid = false;
    dispatch(updateProject(pList));
    return isValid;
}