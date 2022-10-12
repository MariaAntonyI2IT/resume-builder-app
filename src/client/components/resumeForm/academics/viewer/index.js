import styles from './index.module.scss';
import { useSelector } from 'react-redux';

export default function AcademicsViewer() {
    const academicsState = useSelector(state => state.academics);

    return (
        <div className={styles['rb-ac-viewer-container']}>
            <div className={styles['rb-ac-form-container']}>
                {academicsState.course.value &&
                    <div className={[styles['rb-ac-course']].join(' ')}>
                        <span className={styles['rb-ac-course-label']}>Course</span>
                        <div className={styles['rb-ac-data']}>{academicsState.course.value}</div>
                    </div>
                }
                {academicsState.stream.value &&
                    <div className={[styles['rb-ac-stream']].join(' ')}>
                        <span className={styles['rb-ac-stream-label']}>Specialization</span>
                        <div className={styles['rb-ac-data']}>{academicsState.stream.value}</div>
                    </div>
                }
                {academicsState.college.value &&
                    <div className={[styles['rb-ac-college']].join(' ')}>
                        <span className={styles['rb-ac-college-label']}>College</span>
                        <div className={styles['rb-ac-data']}>{academicsState.college.value} {academicsState.location.value ? `, ${academicsState.location.value}` : ''}</div>
                    </div>
                }
            </div>
        </div>
    )
}