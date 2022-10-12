import React from 'react';
import styles from './index.module.scss';
import { Editor } from './../../../widget/editor';
import { store } from './../../../../store';
import { useDispatch } from 'react-redux';
import { memo } from 'react';
import { updateBackEndSkills, updateFrontEndSkills, updateInfra, updateTools } from './../../../../store/techSkills';


const TechSkillEditor = memo(({ isValid }) => {
    const dispatch = useDispatch();
    const techSkillState = store.getState().techSkills

    let generalForm = [
        { label: 'Frontend Skills', key: 'frontEndSkills', type: 'text', value: techSkillState.frontEndSkills.value, validation: techSkillState.frontEndSkills.validation, isValid: techSkillState.frontEndSkills.isValid, dispatch: updateFrontEndSkills },
        { label: 'Backend Skills', key: 'backEndSkills', type: 'text', value: techSkillState.backEndSkills.value, validation: techSkillState.backEndSkills.validation, isValid: techSkillState.backEndSkills.isValid, dispatch: updateBackEndSkills },
        { label: 'Tools', key: 'tools', type: 'text', value: techSkillState.tools.value, validation: techSkillState.tools.validation, isValid: techSkillState.tools.isValid, dispatch: updateTools },
        { label: 'Infra', key: 'infra', type: 'text', value: techSkillState.infra.value, validation: techSkillState.infra.validation, isValid: techSkillState.infra.isValid, dispatch: updateInfra }
    ];

    const onEditorChange = (data, form) => {
        dispatch(form.dispatch({ value: data, isValid: form.isValid }));
    };

    return (
        <div className={styles['rb-ts-editor-container']}>
            <div className={styles['rb-ts-form-container']}>
                {generalForm.map((form, index) => {
                    return (<div key={index} className={[styles[`rb-ts-${form.key}`], 'mb-3'].join(' ')}>
                        {form.validation.isMandatory && <span className={styles['rb-form-mandatory']}>*</span>}
                        <div className={styles[`rb-ts-${form.key}-label`]}>{form.label}</div>
                        <div className={form.validation.isMandatory && !form.isValid ? styles['rb-form-error'] : ''} >
                            <Editor data={form.value} onChange={(data) => onEditorChange(data, form)} />
                        </div>
                    </div>)
                })}
            </div>
        </div>
    )
});

export default TechSkillEditor;