import { updateBackEndSkills, updateFrontEndSkills, updateInfra, updateTools } from './../../../../store/techSkills';
import { store } from './../../../../store';

export const validateForm = () => {
    const dispatch = store.dispatch;
    const state = store.getState().techSkills;
    const formDetails = [
        { name: 'frontEndSkills', action: updateFrontEndSkills },
        { name: 'backEndSkills', action: updateBackEndSkills },
        { name: 'tools', action: updateTools },
        { name: 'infra', action: updateInfra }
    ];
    let isValid = true;
    formDetails.forEach((fd) => {
        const { action, name } = fd;
        let { value, validation: { isMandatory } } = state[name];
        if (!!isMandatory && !value) {
            dispatch(action({ value, isValid: false }));
            isValid = false;
        } else {
            dispatch(action({ value, isValid: true }));
        }
    });
    return isValid;
}