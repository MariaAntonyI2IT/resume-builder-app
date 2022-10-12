import styles from './index.module.scss';
import { useSelector } from 'react-redux';

export default function Projects() {
    let projectState = useSelector(state => state.projects);
    const months = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'July',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
    };

    const getFormattedDate = (date) => {
        return `${months[new Date(date).getMonth()]}, ${new Date(date).getFullYear()}`;
    }
    return (
        <div className={styles['rb-pr-viewer-container']}>
            <div className={styles['rb-pr-form-container']}>
                {projectState.data.map((projectState, i) => {
                    return (
                        <div id={'rb-project-container'} key={i} className={styles['rb-pr-project']}>
                            <div className={styles['rb-pr-name']}>
                                {projectState.name.value} {(projectState.startDate.value && projectState.endDate.value) ? (<span className={styles['rb-pr-date']}>({getFormattedDate(projectState.startDate.value)} - {getFormattedDate(projectState.endDate.value)})</span>) : ''}
                            </div>
                            <div className={styles['rb-pr-desc']} dangerouslySetInnerHTML={{ __html: projectState.desc.value }}>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}