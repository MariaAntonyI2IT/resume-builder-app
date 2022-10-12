import { updateAvatar, updateDesc, updateExp, updateMail, updateName, updateRole } from '../../../../store/profile';
import { store } from './../../../../store';

export const validateForm = () => {
    const dispatch = store.dispatch;
    const state = store.getState().profile;
    const formDetails = [
        { name: 'avatar', action: updateAvatar },
        { name: 'name', action: updateName },
        { name: 'exp', action: updateExp },
        { name: 'role', action: updateRole },
        { name: 'mail', action: updateMail },
        { name: 'desc', action: updateDesc },
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