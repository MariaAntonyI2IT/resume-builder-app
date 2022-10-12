import styles from './index.module.scss';
import { useSelector } from 'react-redux';

export default function Profile({logo}) {
    const profileState = useSelector(state => state.profile);

    return (
        <div className={styles['rb-profile-viewer-container']}>
            <div id='rb-profile-container' className={styles['rb-profile-form-container']}>
                <div className={styles['rb-profile-wrapper']}>
                    <div className={styles['rb-profile-left-wrapper']}>
                        <div className={styles['rb-profile-left-container']}>
                            <div className={styles['rb-profile-avatar']}>
                                {profileState.avatar.value ? <img className={styles['rb-profile-avatar-preview']} src={profileState.avatar.value} /> : <span className={styles['rb-profile-avatar-label']}>Preview</span>}
                            </div>
                        </div>
                        <div className={styles['rb-profile-right-container']}>
                            <div className={styles['rb-profile-name']}>
                                {profileState.name.value}
                            </div>
                            <div className={styles['rb-profile-role']}>
                                {profileState.role.value} {profileState.exp.value ? `(${profileState.exp.value} yrs exp)` : ''}
                            </div>
                            <div className={styles['rb-profile-mail']}>
                                {profileState.mail.value}
                            </div>
                        </div>
                    </div>
                    <div className={styles['rb-profile-right-wrapper']}>
                        <div className={styles['rb-profile-image']}>
                            <img src={logo} alt={'Logo'}></img>
                        </div>
                    </div>
                </div>
                <div className={styles['rb-profile-description']}>
                    {profileState.desc.value}
                </div>
            </div>
        </div>
    )
}