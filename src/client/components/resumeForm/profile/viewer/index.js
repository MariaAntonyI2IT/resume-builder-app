import styles from './index.module.scss';
import { useSelector } from 'react-redux';

export default function ProfileViewer() {
    const profileState = useSelector(state => state.profile);

    return (
        <div className={styles['rb-bp-viewer-container']}>
            <div className={styles['rb-bp-form-container']}>
                <div className={styles['rb-bp-wrapper']}>
                    <div className={styles['rb-bp-left-container']}>
                        <div className={styles['rb-bp-avatar']}>
                            {profileState.avatar.value ? <img className={styles['rb-bp-avatar-preview']} src={profileState.avatar.value} /> : <span className={styles['rb-bp-avatar-label']}>Preview</span>}
                        </div>
                    </div>
                    <div className={styles['rb-bp-right-container']}>
                        <div className={styles['rb-bp-name']}>
                            {profileState.name.value}
                        </div>
                        <div className={styles['rb-bp-role']}>
                            {profileState.role.value} {profileState.exp.value ? `(${profileState.exp.value} yrs exp)` : ''}
                        </div>
                        <div className={styles['rb-bp-mail']}>
                            {profileState.mail.value}
                        </div>
                    </div>
                </div>
                <div className={styles['rb-bp-description']}>
                    {profileState.desc.value}
                </div>
            </div>
        </div>
    )
}