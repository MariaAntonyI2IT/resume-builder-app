import { useState } from 'react';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import ProfileEditor from './profile/editor';
import ProfileViewer from './profile/viewer';
import { validateForm as validateProfileForm } from './profile/editor/validate';
import AcademicsEditor from './academics/editor';
import AcademicsViewer from './academics/viewer';
import { validateForm as validatecademicsForm } from './academics/editor/validate';
import ProjectsEditor from './projects/editor';
import ProjectsViewer from './projects/viewer';
import { validateForm as validateProjectsForm } from './projects/editor/validate';
import TechSkillEditor from './techSkills/editor';
import TechSkillViewer from './techSkills/viewer';
import { validateForm as validateTechSkillsForm } from './techSkills/editor/validate';
import Sidebar from './../layout/sidebar';
import { sendPostRequest } from './../../utils/http';
import { getResumeFields } from '../../store/utils/resume/fetch';
import { config } from './../../utils/config';
import { updateSelectedForm, updateTitle } from './../../store/common';
import Loader from './../widget/spinner';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import AlertDialog from './../widget/alert';

export default function resumeForm({ mode = 'create' }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [forms, setForms] = useState({
        profile: {
            title: 'Profile Details',
            editor: ProfileEditor,
            viewer: ProfileViewer,
            name: 'Profile',
            key: 'profile',
            back: null,
            next: 'techSkills',
            isValid: true,
            validate: validateProfileForm
        },
        techSkills: {
            title: 'Tech Details',
            editor: TechSkillEditor,
            viewer: TechSkillViewer,
            name: 'Tech Skills',
            key: 'techSkills',
            back: 'profile',
            next: 'academics',
            isValid: true,
            validate: validateTechSkillsForm
        },
        academics: {
            title: 'Academics',
            editor: AcademicsEditor,
            viewer: AcademicsViewer,
            name: 'Academics',
            key: 'academics',
            back: 'techSkills',
            next: 'projects',
            isValid: true,
            validate: validatecademicsForm
        },
        projects: {
            title: 'Projects',
            editor: ProjectsEditor,
            viewer: ProjectsViewer,
            name: 'Projects',
            key: 'projects',
            back: 'academics',
            next: null,
            isValid: true,
            isPreview: true,
            validate: validateProjectsForm
        }
    });


    const dispatch = useDispatch();
    const commonDetails = useSelector(state => state.common);

    const titleForm = { label: 'Title', key: 'title', type: 'text', value: commonDetails.title.value, validation: commonDetails.title.validation, isValid: commonDetails.title.isValid, dispatch: updateTitle }
    const formDetail = forms[commonDetails.selectedForm] || forms.profile;

    const onBtnClick = (target) => {
        validate();
        dispatch(updateSelectedForm(target))
    }

    const validate = () => {
        validateTitle();
        const shallowForms = { ...forms };
        shallowForms[formDetail.key].isValid = shallowForms[formDetail.key].validate();
        setForms(shallowForms);
    }

    const validateTitle = () => {
        let isValid = true;
        let { value, validation: { isMandatory } } = titleForm;
        if (!!isMandatory && !value) {
            dispatch(updateTitle({ value, isValid: false }));
            isValid = false;
        } else {
            dispatch(updateTitle({ value, isValid: true }));
        }
        return isValid;
    }

    const onPreviewBtnClick = () => {
        let isValid = validateTitle();
        if (isValid) {
            const shallowForms = { ...forms };
            const formKeys = Object.keys(shallowForms);
            isValid = true;
            formKeys.forEach((key) => {
                const form = shallowForms[key];
                form.isValid = form.validate();
                if (isValid) isValid = form.isValid;
            });
            setForms(shallowForms);
            if (isValid) router.push({
                pathname: config.path.resume.preview,
                query: { mode }
            });
        }
        if (!isValid) toast.error('Please fill the mandatory fields');
    }

    const onInputChange = (e) => {
        const value = e.target.value;
        dispatch(updateTitle({ value, isValid: titleForm.isValid }));
    }

    const onCloseBtnClick = async () => {
        try {
            if (commonDetails.draft) {
                setShowModal(true);
            } else {
                router.push(config.path.resume.list);
            }
        } catch (err) {
            console.log(err);
            const errorMsg = err.message ? err.message : err.toString();
            toast.error(errorMsg);
            setTimeout(() => {
                setLoading(false);
            }, 150);
        }
    }

    const handleClose = () => {
        setShowModal(false);
        router.push(config.path.resume.list);
    }

    const handleProceed = async () => {
        try {
            const id = commonDetails.selectedId;
            const url = id ? config.api.resume.update : config.api.resume.create;
            setLoading(true);
            const payload = { ...getResumeFields(), draft: true, id };
            await sendPostRequest(url, payload);
            setShowModal(false);
            toast.success('Draft Saved Successfully');
            setTimeout(() => {
                router.push(config.path.resume.list);
                setLoading(false);
            }, 150);
        } catch (err) {
            console.log(err);
            const errorMsg = err.message ? err.message : err.toString();
            toast.error(errorMsg);
            setTimeout(() => {
                setLoading(false);
            }, 150);
        }
    }
    return (
        <div className={styles['rb-rf-container']}>
            <Loader loading={loading} />
            <AlertDialog show={showModal} header={'Confirmation'} body={'Are you sure you wan to save it as draft?'}
                footerConfirmBtn={`yes`} footerCloseBtn={`No`} handleClose={() => handleClose()} handleProceed={() => handleProceed()} />
            <Sidebar forms={forms} validate={validate} />
            <div className={styles['rb-form-container']}>
                <div className={styles['rb-bp-header-container']}>
                    <div className={[styles[`rb-bp-form-${titleForm.key}`], 'form-floating', 'mb-3'].join(' ')}>
                        {titleForm.validation.isMandatory && <span className={styles['rb-form-mandatory']}>*</span>}
                        <input className={titleForm.validation.isMandatory && !titleForm.isValid ? [styles['rb-form-error'], 'form-control'].join(' ') : 'form-control'} type={titleForm.type} min={titleForm.validation.min} max={titleForm.validation.max} value={titleForm.value} id={`rb-${titleForm.key}`} onChange={(e) => onInputChange(e)} />
                        <label htmlFor={`bp-${titleForm.key}`} className="form-label">{titleForm.label}</label>
                    </div>
                    <div className={styles['rb-bp-header-right-warpper']}>
                        <div className={styles['rb-bp-header-name']}>{formDetail.title}</div>
                        <span className="material-icons" title={'Close'} onClick={() => onCloseBtnClick()}>
                            <span className={[styles['rb-rf-icon'], "material-symbols-rounded"].join(' ')}>
                                close
                            </span>
                        </span>
                    </div>
                </div>
                <div className={styles['rb-rf-content']}>
                    <div className={styles['rb-rf-editor']}>
                        <div className={styles['rb-rf-label']}>Editor</div>
                        <formDetail.editor isValid={formDetail.isValid} />
                    </div>
                    <div className={styles['rb-rf-viewer']}>
                        <div className={styles['rb-rf-label']}>Viewer</div>
                        <formDetail.viewer />
                    </div>
                </div>
                <div className={styles['rb-rf-nav']}>
                    {!!formDetail.back && <button type="button" className="btn btn-primary" onClick={() => onBtnClick(formDetail.back, formDetail)}>Back</button>}
                    {!!formDetail.next && <button type="button" className="btn btn-primary" onClick={() => onBtnClick(formDetail.next, formDetail)}>Next</button>}
                    {!!formDetail.isPreview && <button type="button" className="btn btn-primary" onClick={() => onPreviewBtnClick()}>Preview</button>}
                </div>
            </div>
        </div>
    )
}