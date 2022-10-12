import styles from './index.module.scss';
import { useRef, useState, useEffect } from 'react';
import { config } from './../../utils/config';
import { sendPostRequest } from './../../utils/http';
import { toast } from 'react-toastify';
import Loader from './../widget/spinner';
import { useRouter } from 'next/router';

const Preference = () => {
    const router = useRouter();
    const logoFileRef = useRef();
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState('');
    const [pageMargin, setPageMargin] = useState({ top: { value: 10, isValid: true }, right: { value: 10, isValid: true }, bottom: { value: 10, isValid: true }, left: { value: 10, isValid: true } });
    const [logo, setLogo] = useState({ value: '', isValid: true });

    useEffect(() => {
        try {
            setLoading(true);
            getPreference();
            setLoading(false);
        } catch (err) {
            console.log(err);
            const errorMsg = err.message ? err.message : err.toString();
            setLoading(false);
            toast.error(errorMsg);
            reject(err);
        }
    }, []);

    const getPreference = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const url = config.api.preference.retreive;
                const response = await sendPostRequest(url);
                setId(response._id);
                setLogo({ value: response.logo, isValid: logo.isValid });
                setPageMargin({
                    top: { value: response.pageMargin.top, isValid: pageMargin.top.isValid },
                    right: { value: response.pageMargin.right, isValid: pageMargin.right.isValid },
                    bottom: { value: response.pageMargin.bottom, isValid: pageMargin.bottom.isValid },
                    left: { value: response.pageMargin.left, isValid: pageMargin.left.isValid }
                });
                resolve(response);
            } catch (err) {
                console.log(err);
                reject(err);
            }
        });
    }

    let logoForm = { label: 'upload/drop image', type: 'file', key: 'logo', value: logo.value, validation: { isMandatory: true }, isValid: logo.isValid };

    let pageMarginForm = [
        { label: 'Top', type: 'number', key: 'top', value: pageMargin.top.value, validation: { isMandatory: true, min: 0, max: 100 }, isValid: pageMargin.top.isValid },
        { label: 'Right', type: 'number', key: 'right', value: pageMargin.right.value, validation: { isMandatory: true, min: 0, max: 100 }, isValid: pageMargin.right.isValid },
        { label: 'Bottom', type: 'number', key: 'bottom', value: pageMargin.bottom.value, validation: { isMandatory: true, min: 0, max: 100 }, isValid: pageMargin.bottom.isValid },
        { label: 'Left', type: 'number', key: 'left', value: pageMargin.left.value, validation: { isMandatory: true, min: 0, max: 100 }, isValid: pageMargin.left.isValid },
    ];

    const onDrop = (e, form) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setLogo({ value: reader.result, isValid: logo.isValid });
        };
    }

    const onLogoChange = (e, form) => {
        const file = e.target.files[0];
        const reader = new FileReader(file);
        reader.readAsDataURL(file);
        reader.onload = () => {
            setLogo({ value: reader.result, isValid: logo.isValid });
        };
    }

    const onLogoClick = (e) => {
        logoFileRef.current.click();
    }

    const ondragOver = (e) => {
        e.preventDefault(e);
    }

    const onInputChange = (e, form) => {
        const value = e.target.value;
        setPageMargin({ ...pageMargin, [form.key]: { value: value, isValid: pageMargin[form.key].isValid } });
    }

    const validateForm = () => {
        let isValid = true;
        const pageForm = validatepageMarginForm();
        if (!pageForm) isValid = false;
        const logoForm = validateLogoForm();
        if (!logoForm) isValid = false;
        return isValid;
    }

    const validateLogoForm = () => {
        let isValid = true;
        let { value, validation: { isMandatory } } = logoForm;
        if (!!isMandatory && !value) {
            isValid = false;
            setLogo({ value: value, isValid: false });
        } else {
            setLogo({ value: value, isValid: true });
        }
        return isValid;
    }
    const validatepageMarginForm = () => {
        let isValid = true;
        let obj = {};
        pageMarginForm.forEach((fd) => {
            let { value, key, validation: { isMandatory } } = fd;
            if (!!isMandatory && !value) {
                isValid = false;
                obj[key] = { value: value, isValid: false };
            } else {
                obj[key] = { value: value, isValid: true };
            }
        });
        setPageMargin(obj);
        return isValid;
    }

    const onUpdateBtnClick = async () => {
        try {
            if (validateForm()) {
                const url = config.api.preference.update;
                setLoading(true);
                const payload = {
                    id,
                    pageMargin: {
                        top: pageMargin.top.value,
                        right: pageMargin.right.value,
                        bottom: pageMargin.bottom.value,
                        left: pageMargin.left.value
                    },
                    logo: logo.value
                };
                await sendPostRequest(url, payload);
                toast.success('Updated Preference');
                setTimeout(() => {
                    setLoading(false);
                }, 150);
            } else {
                toast.error('Please fill the mandatory fields');
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

    const onCloseBtnClick = () => {
        router.push(config.path.resume.list);
    }

    return (
        <div className={styles['rb-pf-container']}>
            <Loader loading={loading} />
            <div className={styles['rb-header-container']}>
                <div className={styles['rb-header-name']}>Preference</div>
                <span className="material-icons" title={'Close'} onClick={() => onCloseBtnClick()}>
                    <span className={[styles['rb-pf-icon'], "material-symbols-rounded"].join(' ')}>
                        close
                    </span>
                </span>
            </div>
            <div className={styles['rb-pf-wrapper']}>
                <div className={styles['rb-pf-form-container']}>
                    <div className={styles['rb-pf-logo-wrapper']}>
                        <div className={styles['rb-form-header-seperator']}>Logo</div>
                        <div className={styles['rb-pf-logo-container']}>
                            <div title={logoForm.label} className={logoForm.validation.isMandatory && !logoForm.isValid ? [styles['rb-pf-logo'], styles['rb-form-error']].join(' ') : styles['rb-pf-logo']} onDrop={(e) => onDrop(e, logoForm)} onDragOver={(e) => ondragOver(e)} onClick={(e) => onLogoClick(e)}>
                                {logoForm.value ? <img src={logoForm.value} /> : <span className={styles['rb-pf-logo-label']}>{logoForm.label}</span>}
                                <input className={styles['rb-logo-upload']} ref={logoFileRef} type={logoForm.type} onChange={(e) => onLogoChange(e, logoForm)} />
                            </div>
                        </div>
                    </div>
                    <div className={styles['rb-pf-margin-wrapper']}>
                        <div className={styles['rb-form-header-seperator']}>Margin (in cm)</div>
                        {pageMarginForm.map((profile) => {
                            return (
                                <div key={profile.key} className={[styles[`rb-pf-${profile.key}`], 'mb-3'].join(' ')}>
                                    {profile.validation.isMandatory && <span className={styles['rb-form-mandatory']}>*</span>}
                                    <label htmlFor={`pf-${profile.key}`} className="form-label">{profile.label}</label>
                                    <input className={profile.validation.isMandatory && !profile.isValid ? [styles['rb-form-error'], 'form-control'].join(' ') : 'form-control'} type={profile.type} min={profile.validation.min} max={profile.validation.max} value={profile.value} id={`pf-${profile.key}`} onChange={(e) => onInputChange(e, profile)} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className={styles['rb-footer-container']}>
                <div className={styles['rb-list-update']} onClick={() => onUpdateBtnClick()}>
                    <button type="button" className="btn btn-primary">Update</button>
                </div>
            </div>

        </div>
    )
};

export default Preference;