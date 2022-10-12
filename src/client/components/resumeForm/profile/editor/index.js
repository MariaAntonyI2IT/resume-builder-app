import styles from './index.module.scss';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAvatar, updateDesc, updateExp, updateMail, updateName, updateRole } from './../../../../store/profile';

const ProfileEditor = ({ isValid }) => {
    const avatarFileRef = useRef();
    const profileState = useSelector(state => state.profile);
    const dispatch = useDispatch();;

    let avatarForm = { label: 'upload/drop image', type: 'file', key: 'avatar', value: profileState.avatar.value, validation: profileState.avatar.validation, isValid: profileState.avatar.isValid, dispatch: updateAvatar };
    let generalForm = [
        { label: 'Name', key: 'name', type: 'text', value: profileState.name.value, validation: profileState.name.validation, isValid: profileState.name.isValid, dispatch: updateName },
        { label: 'Designation', type: 'text', key: 'role', value: profileState.role.value, validation: profileState.role.validation, isValid: profileState.role.isValid, dispatch: updateRole },
        { label: 'Exp (in years)', type: 'number', key: 'exp', value: profileState.exp.value, validation: profileState.exp.validation, isValid: profileState.exp.isValid, dispatch: updateExp },
        { label: 'Email address', type: 'email', key: 'mail', value: profileState.mail.value, validation: profileState.mail.validation, isValid: profileState.mail.isValid, dispatch: updateMail }
    ];
    let descForm = { label: 'Profile Description', type: 'text', key: 'desc', value: profileState.desc.value, validation: profileState.desc.validation, isValid: profileState.desc.isValid, dispatch: updateDesc };

    const onDrop = (e, form) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            dispatch(updateAvatar({ value: reader.result, isValid: form.isValid }));
        };
    }

    const onAvatarChange = (e, form) => {
        const file = e.target.files[0];
        const reader = new FileReader(file);
        reader.readAsDataURL(file);
        reader.onload = () => {
            dispatch(updateAvatar({ value: reader.result, isValid: form.isValid }));
        };
    }

    const onAvatarClick = (e) => {
        avatarFileRef.current.click();
    }

    const ondragOver = (e) => {
        e.preventDefault(e);
    }

    const onInputChange = (e, form) => {
        const value = e.target.value;
        dispatch(form.dispatch({ value, isValid: form.isValid }));
    }

    return (
        <div className={styles['rb-bp-editor-container']}>
            <div className={styles['rb-bp-form-container']}>
                <div className={styles['rb-bp-wrapper']}>
                    <div className={styles['rb-bp-left-container']}>
                        <div className={avatarForm.validation.isMandatory && !avatarForm.isValid ? [styles['rb-bp-avatar'], styles['rb-form-error']].join(' ') : styles['rb-bp-avatar']} onDrop={(e) => onDrop(e, avatarForm)} onDragOver={(e) => ondragOver(e)} onClick={(e) => onAvatarClick(e)}>
                            <span className={styles['rb-bp-avatar-label']}>{avatarForm.label}</span>
                            <input className={styles['rb-avatar-upload']} ref={avatarFileRef} type={avatarForm.type} onChange={(e) => onAvatarChange(e, avatarForm)} />
                        </div>
                    </div>
                    <div className={styles['rb-bp-right-container']}>
                        {generalForm.map((profile) => {
                            return (
                                <div key={profile.key} className={[styles[`rb-bp-${profile.key}`], 'form-floating', 'mb-3'].join(' ')}>
                                    {profile.validation.isMandatory && <span className={styles['rb-form-mandatory']}>*</span>}
                                    <input className={profile.validation.isMandatory && !profile.isValid ? [styles['rb-form-error'], 'form-control'].join(' ') : 'form-control'} type={profile.type} min={profile.validation.min} max={profile.validation.max} value={profile.value} id={`bp-${profile.key}`} onChange={(e) => onInputChange(e, profile)} />
                                    <label htmlFor={`bp-${profile.key}`} className="form-label">{profile.label}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div key={descForm.key} className={[styles[`rb-bp-${descForm.key}`], 'form-floating', 'mb-3'].join(' ')}>
                    {descForm.validation.isMandatory && <span className={styles['rb-form-mandatory']}>*</span>}
                    <textarea rows={5} className={descForm.validation.isMandatory && !descForm.isValid ? [styles['rb-form-error'], 'form-control'].join(' ') : 'form-control'} value={descForm.value} id={`bp-${descForm.key}`} onChange={(e) => onInputChange(e, descForm, descForm.dispatch)} ></textarea>
                    <label htmlFor={`bp-${descForm.key}`} className="form-label">{descForm.label}</label>
                </div>
            </div>
        </div>
    )
};

export default ProfileEditor;