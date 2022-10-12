import styles from './index.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { updateCollege, updateCourse, updateStream, updateLocation } from '../../../../store/academics';

const AcademicsEditor = ({ isValid }) => {
    const academicsState = useSelector(state => state.academics);
    const dispatch = useDispatch();

    const onInputChange = (e, form) => {
        const value = e.target.value;
        dispatch(form.dispatch({ value, isValid: form.isValid }));
    }

    let generalForm = [
        { label: 'Course', key: 'course', type: 'text', value: academicsState.course.value, validation: academicsState.course.validation, isValid: academicsState.course.isValid, dispatch: updateCourse },
        { label: 'Specialization', type: 'text', key: 'stream', value: academicsState.stream.value, validation: academicsState.stream.validation, isValid: academicsState.stream.isValid, dispatch: updateStream },
        { label: 'College/university', type: 'text', key: 'college', value: academicsState.college.value, validation: academicsState.college.validation, isValid: academicsState.college.isValid, dispatch: updateCollege },
        { label: 'Location', type: 'text', key: 'location', value: academicsState.location.value, validation: academicsState.location.validation, isValid: academicsState.location.isValid, dispatch: updateLocation }
    ];

    return (
        <div className={styles['rb-ac-editor-container']}>
            <div className={styles['rb-ac-form-container']}>
                {generalForm.map((form, index) => {
                    return (
                        <div key={index} className={[styles[`rb-ac-${form.key}`], 'form-floating', 'mb-3'].join(' ')}>
                            {form.validation.isMandatory && <span className={styles['rb-form-mandatory']}>*</span>}
                            <input type="text" className={form.validation.isMandatory && !form.isValid ? [styles['rb-form-error'], 'form-control'].join(' ') : 'form-control'} value={form.value} id={`ac-${form.key}`} onChange={(e) => onInputChange(e, form)} />
                            <label htmlFor={`ac-${form.key}`} className="form-label">{form.label}</label>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default AcademicsEditor;