import { updateCollege, updateCourse, updateStream, updateLocation } from '../../../../store/academics';
import { store } from './../../../../store';

export const validateForm = () => {
    const dispatch = store.dispatch;
    const state = store.getState().academics;
    const formDetails = [
        { name: 'course', action: updateCourse },
        { name: 'stream', action: updateStream },
        { name: 'college', action: updateCollege },
        { name: 'location', action: updateLocation }
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