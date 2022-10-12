import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './index.module.scss';
import { useDispatch } from 'react-redux';
import { store } from './../../../../store';
import { updateProject, projectData } from '../../../../store/projects';
import { Editor } from './../../../widget/editor';

const ProjectsEditor = ({ isValid }) => {
    let dispatch = useDispatch();
    const dragItem = useRef();
    const dragOverItem = useRef();
    const projectState = store.getState().projects;
    let [projects, setProjects] = useState([]);
    useEffect(() => {
        setProjects(projectState.data);
    }, [isValid]);

    const onInputChange = (e, i, prop) => {
        let value = e.target.value;
        const projectState = store.getState().projects.data;
        let pList = JSON.parse(JSON.stringify(projectState));
        pList[i][prop].value = value;
        dispatch(updateProject(pList));
        setProjects(pList);
    }

    const addProjects = () => {
        const projectState = store.getState().projects.data;
        let pList = [...projectState, ...[projectData]];
        dispatch(updateProject(pList));
        setProjects(pList);
    }

    const removeProject = (i) => {
        const projectState = store.getState().projects.data;
        let pList = [...projectState];
        pList.splice(i, 1);
        dispatch(updateProject(pList));
        setProjects(pList);
    }

    const toggle = (i) => {
        const projectState = store.getState().projects.data;
        let pList = JSON.parse(JSON.stringify(projectState));
        pList = pList.map((pl, ci) => {
            pl['expanded'] = ci == i ? !pl['expanded'] : false;
            return pl;
        });
        dispatch(updateProject(pList));
        setProjects(pList);
    }

    const onDragStart = (e, i) => {
        const projectState = store.getState().projects.data;
        let pList = JSON.parse(JSON.stringify(projectState));
        pList = pList.map((pl) => {
            pl['expanded'] = false
            return pl;
        });
        dispatch(updateProject(pList));
        setProjects(pList);
        e.dataTransfer.setDragImage(e.currentTarget.parentNode, 0, 0);
        dragItem.current = i;
    }

    const onDragEnter = (e, i) => {
        dragOverItem.current = i;
    };

    const onEditorChange = useCallback((data, i) => {
        let value = data;
        const projectState = store.getState().projects.data;
        let pList = JSON.parse(JSON.stringify(projectState));
        pList[i]['desc'].value = value;
        dispatch(updateProject(pList));
    }, []);

    const onDragEnd = (e) => {
        const projectState = store.getState().projects.data;
        let pList = JSON.parse(JSON.stringify(projectState));
        const dragItemContent = pList[dragItem.current];
        pList.splice(dragItem.current, 1);
        pList.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        dispatch(updateProject(pList));
        setProjects(pList);
    }

    return (
        <div className={styles['rb-pr-editor-container']}>
            <div className={styles['rb-pr-add-project']} title={'Add Project'} onClick={() => addProjects()}><span className="material-icons">
                add_circle
            </span></div>
            <div className={styles['rb-pr-form-container']}>
                {projects.map((projectState, i) => {
                    return (
                        <div key={i} className={styles['rb-pr-project']}>
                            <div className={styles['rb-pr-toggle-project']} title={`${projectState.expanded ? 'Collapse Project' : 'Expand Project'}`} onClick={(e) => toggle(i)}>
                                <span className="material-icons">
                                    <span className={[styles['rb-pr-icon'], "material-symbols-rounded"].join(' ')}>
                                        {projectState.expanded ? 'expand_less' : 'expand_more'}
                                    </span>
                                </span>
                            </div>
                            <div className={styles['rb-pr-remove-project']} title={'Delete Project'} onClick={() => removeProject(i)}>
                                <span className="material-icons">
                                    <span className={[styles['rb-pr-icon'], "material-symbols-rounded"].join(' ')}>
                                        close
                                    </span>
                                </span>
                            </div>
                            {!projectState.expanded ? <div className={styles['rb-project-collapsed-form']}>
                                <div className={styles['rb-pr-reorder-project']} title={'Reorder Project'} draggable={true} onDragStart={(e) => onDragStart(e, i)} onDragEnter={(e) => onDragEnter(e, i)} onDragEnd={(e) => onDragEnd(e)}>
                                    <span className="material-icons">
                                        <span className={[styles['rb-pr-reorder'], "material-symbols-rounded"].join(' ')}>
                                            reorder
                                        </span>
                                    </span>
                                </div>
                                <div className={styles['rb-pr-header-name']}>
                                    {projectState.name.value ? projectState.name.value : '<<Untitled>>'}
                                </div>
                            </div> :
                                (<div className={styles['rb-project-expanded-form']}>
                                    <div className={[styles['rb-pr-name'], 'form-floating', 'mb-3'].join(' ')}>
                                        <span className={styles['rb-form-mandatory']}>*</span>
                                        <input type="text" className={!projectState.name.isValid ? [styles['rb-form-error'], 'form-control'].join(' ') : 'form-control'} value={projectState.name.value} id="pr-name" onChange={(e) => onInputChange(e, i, 'name')} />
                                        <label htmlFor="pr-name" className="form-label">Project Name</label>
                                    </div>
                                    <div className={[styles['rb-pr-sd'], 'form-floating', 'mb-3'].join(' ')}>
                                        <span className={styles['rb-form-mandatory']}>*</span>
                                        <input type="date" className={!projectState.startDate.isValid ? [styles['rb-form-error'], 'form-control'].join(' ') : 'form-control'} value={projectState.startDate.value} id="pr-sd" onChange={(e) => onInputChange(e, i, 'startDate')} />
                                        <label htmlFor="pr-sd" className="form-label">Start Date</label>
                                    </div>
                                    <div className={[styles['rb-pr-ed'], 'form-floating', 'mb-3'].join(' ')}>
                                        <span className={styles['rb-form-mandatory']}>*</span>
                                        <input type="date" className={!projectState.endDate.isValid ? [styles['rb-form-error'], 'form-control'].join(' ') : 'form-control'} value={projectState.endDate.value} id="pr-ed" onChange={(e) => onInputChange(e, i, 'endDate')} />
                                        <label htmlFor="pr-ed" className="form-label">End date</label>
                                    </div>
                                    <div className={[styles['rb-pr-desc'], 'form-floating', 'mb-3'].join(' ')}>
                                        <span className={styles['rb-form-mandatory']}>*</span>
                                        <div className={!projectState.desc.isValid ? styles['rb-form-error'] : ''} >
                                            <Editor data={projectState.desc.value} index={i} onChange={onEditorChange} />
                                        </div>
                                    </div>
                                </div>)
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default ProjectsEditor;