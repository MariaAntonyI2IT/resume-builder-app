import styles from './index.module.scss';
import { useSelector } from 'react-redux';

export default function Academics() {
    const academicsState = useSelector(state => state.academics);

    return (
        <div className={styles['rb-ac-viewer-container']}>
            <div className={styles['rb-ac-form-container']}>
                {academicsState.course.value &&
                    <div className={[styles['rb-ac-course']].join(' ')}>
                        {<div className={styles['rb-ac-course-data']}>{academicsState.course.value} -</div>}  {academicsState.stream.value &&
                            <div className={styles['rb-ac-stream-data']}>{academicsState.stream.value}</div>
                        }
                    </div>
                }
                {academicsState.college.value &&
                    <div className={[styles['rb-ac-college']].join(' ')}>
                        <div className={styles['rb-ac-college-data']}>{academicsState.college.value} {academicsState.location.value ? `, ${academicsState.location.value}.` : ''}</div>
                    </div>
                }
            </div>
        </div>
    )
}