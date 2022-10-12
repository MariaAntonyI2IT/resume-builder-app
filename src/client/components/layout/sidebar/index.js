import styles from './index.module.scss';
import { updateSelectedForm } from './../../../store/common';
import { useSelector, useDispatch } from 'react-redux';

export default function SideBar({ validate, forms }) {

    const dispatch = useDispatch();
    const commonDetails = useSelector(state => state.common);
    const resumeForms = Object.keys(forms).map(fo => {
        const f = forms[fo];
        return { name: f.name, key: f.key, isValid: f.isValid, selected: f.key == commonDetails.selectedForm }
    });
    const onNavClick = (target) => {
        validate();
        dispatch(updateSelectedForm(target))
    };

    return (
        <div className={styles['rb-sidebar-container']}>
            <div className={styles['rb-form-status-container']}>
                {resumeForms.map((form, index) => {
                    return (<div className={!form.isValid ? styles['rb-form-invalid'] : ''} key={index}>
                        <div className={styles['rb-circle-indication']} onClick={() => onNavClick(form.key)}>
                            {form.selected && <span className={styles['rb-selected']}></span>}
                            <span className={styles['rb-name']}>{form.name}</span>
                        </div>
                        {index != resumeForms.length - 1 && <div className={styles['rb-seperator']}></div>}
                    </div>)
                })}
            </div>
        </div>
    )
}