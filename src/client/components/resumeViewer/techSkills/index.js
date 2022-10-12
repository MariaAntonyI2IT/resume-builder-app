import styles from './index.module.scss';
import { useSelector } from 'react-redux';

export default function TechSkill() {
    const techSkillState = useSelector(state => state.techSkills);
    let generalForm = [
        { label: 'Frontend Skills', key: 'frontEndSkills', value: techSkillState.frontEndSkills.value },
        { label: 'Backend Skills', key: 'backEndSkills', value: techSkillState.backEndSkills.value },
        { label: 'Tools', key: 'tools', value: techSkillState.tools.value },
        { label: 'Infra', key: 'infra', value: techSkillState.infra.value }
    ];

    return (
        <div className={styles['rb-ts-viewer-container']}>
            <div className={styles['rb-ts-form-container']}>
                {generalForm.map((form, index) => {
                    return (
                        form.value &&
                        <div key={index} className={[styles[`rb-ts-${form.key}`]].join(' ')}>
                            <span className={styles[`rb-ts-${form.key}-label`]}>{form.label}</span>
                            <div className={styles['rb-ts-data']} dangerouslySetInnerHTML={{ __html: form.value }}></div>
                        </div>

                    )
                })}
            </div>
        </div>
    )
}