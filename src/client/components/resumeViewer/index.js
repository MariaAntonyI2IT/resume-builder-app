import styles from './index.module.scss';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Profile from './profile';
import TechSkills from './techSkills';
import Academics from './academics';
import Projects from './projects';
import { useSelector } from 'react-redux';
import { sendPostRequest } from './../../utils/http';
import { getResumeFields } from '../../store/utils/resume/fetch';
import { config } from './../../utils/config';
import { toast } from 'react-toastify';
import Loader from './../widget/spinner';

export default function ResumeViewer() {
    let resumeData = useSelector(state => state);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [mode, setMode] = useState(router.query.mode || 'create');
    const [pageMargin, setPageMargin] = useState({ top: 20, right: 20, bottom: 20, left: 20 });
    const [logo, setLogo] = useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAuCAMAAADUbS0KAAAAAXNSR0IB2cksfwAAAYNQTFRFAAAAACScACWcACucACScACScACScACOcACSdACqVACCfACOcACSbACScACSdACSeACedACKfACScACScACScACSbAEB/ACOcACScACScACScACOdAACqACaZACSdACScACScACScACedACKdACScACScACScACWcACKZACqqACSdACScACOdACWbAAB/ACCfACSbACScACScACWcACOcACOaACScACScACWcACSdAByqACSbACSdACScACOdAAD/ACGcACSdACScACOcACScACSbACSbACScACSbACOcABqZACScACSdACWcACSbACScACScACWbACOeACSdACWcACWcACSdACSbACScACScACacACScACScACSdACScACihACSdACWeACScACWcACWdACmZACSbACScACWaADOZACScACWcACSeACifAC6iACSbACScACOcACScACOcACScACSbACSeACebACSbACSaACObACScACOdACScACScACSbACObh9dtcQAAAIF0Uk5TAM9vEv+w9a1ODBBszeiMKg0tjurLawRQsfSqSQMUctPliCc0le7HZw8GVremRQIYeNnihCQ6m/HDYwlcvaJBAR9/3t+BQKHzwF8KYp4+hePcfR1Gp7xbacmaNvBk6Z0TcDfQ0WAZpO8wBfKgFSALgK+fv5Dgjz8hHEeXcYKl1U9zmRsV/wAAA/lJREFUeJzFl/l/2zQUwF/Mc6Ea92UK42YwrnXAxsY4OmPEXI5xjHPmMEZggSec2Eq4jz+d92Q7/bQ0TdpPiN8PtqxI+uqdUmDgXQe9CPpr19/QC3hdHLvxpptvWT34Vnrcdvsdd94legAD3B3cs3HvfcdXDya5/4EHH3r4kR7AJI8+duLxJ072AAZ48qmnN5559tTqwSSbp597/oUzPYBJzr547vxL6z2AAS68/MrGq69trR5McjF8PXrj4v8HPsCiW/LNS/H2W6sHk6y/ff7SO+/2ACY5c/m99z/4sAcwwKkrH619/MmF1YNJTn762bnPz/YAJrmaJFd6AG998eVXXy+R24JTb86wb7Jvry4T24IVYtB8SkT530HffZ8fW/bB4cAaUc8G/3D6x+LakrGdqY2B2eDDiQgXBP9EjxKR4MMch8qBywjzEd3BTFjlWLH/1QCj4XRL2L7jPZvkT5McEmxybESKgXsPBNRNTwmpe9t5YNcfHxJcEECqhMAlJkpTqwCdahA+5hBjTfrM1Fh41diArrCqtFZkn+HQm3dpnYIZ5OJbWqaQtjk95WQSIJoY8/FkZ6k9YGGVDjItJErJg+pC69LAwTIFNxnFwYWdgI5a68uEX+MZ4DrlmfG0f68H5oFLapF6BLGxE7aCNinHm1C+RVT7g+NRSILT/sCOvHkK74DJlRoMxZX0MaJpghZ1VuC9CF4nc1vbD5xKlp1+kKkNFgVPLSwN2bWiPApI4ygcU7TLAitudIvtAacjegjybptJ7OegXhQMHNFJwXbVMW+gFqAtJxN1Ket6ppM6sLOxhKIKw4h2VQzDoO2O5vnZgU2TKZp82cSlaV7cJcC1qWfHbR1YlSw0V6fK/Rqkbpos1WI+Pqzg/CHz12gukVQCOOdNGJoybGUV4KZeRmJ3Gq8ATNFUU2H2GUxes2jpOR9cq9ljFgKbDFOKSczbUzHGgyv9NKoP2Nw+squidT4WXJ3xCGBljLfNMWyU2A6b+4TxPGoo96EDMNvhBPiwHVHqQTsKp/9QdI7FEcBxkZVlQukrs6wuY64lihxFDcWnDhSBpE+/IrAtKPW0bUYh3dN/lr84bmKOAuahMuPzhRWxmpbmZI4VJGQIY10hg0y2pk54lP8raXzttxO/HweVI805Cjhte6SbUyhowjLwXcPFn55Mhi1YDiYk3h+Al9f+3AS+YmQCjgSWu8AEa8D0KRIhSHtNLijjDmxdtSON/+L/glSiB3/TTpYCbnxbFqy+ohE+1++6BZvu/vSP211bMuxSwCLzWDPnYD5gi5SMbWmYz2Yv6BYpxpvNAh04XhDc/bo/GAQZ0He5FLPyosjigjXWNio4uKk8wb/JAg5+1E6ADQAAAABJRU5ErkJggg==');

    const headerStyles =
    {
        color: '#2079C7',
        padding: '20px 10px 10px 0',
        fontSize: '16px',
        fontWeight: 800
    };

    const breakStyle = {
        height: '2px',
        backgroundColor: 'lightgray'
    };

    const wrapperStyle = {
        display: 'flex'
    };

    const leftWrapperStyle = {
        display: 'flex',
        flexDirection: 'column',
        width: '35%'
    };

    const rightWrapperStyle = {
        width: '65%'
    };

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


    const onDownloadBtnClick = () => {
        const element = document.getElementById('print-area');
        var opt = {
            margin: [pageMargin.top, pageMargin.left, pageMargin.bottom, pageMargin.right],
            filename: `${resumeData.common.title.value}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            pagebreak: { avoid: '#rb-project-container' },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'p' },
        };
        html2pdf().set(opt).from(element).save();
    }

    const onBackBtnClick = () => {
        router.push(mode == 'preview' ? config.path.resume.list : (mode == 'update' ? config.path.resume.update : config.path.resume.create))
    }

    const onCreateBtnClick = async () => {
        try {
            const url = config.api.resume.create;
            setLoading(true);
            const payload = getResumeFields();
            await sendPostRequest(url, { ...payload, draft: false });
            toast.success('Created Resume Form');
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

    const getPreference = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const url = config.api.preference.retreive;
                const response = await sendPostRequest(url);
                setLogo(response.logo);
                setPageMargin({ top: response.pageMargin.top, right: response.pageMargin.right, bottom: response.pageMargin.bottom, left: response.pageMargin.left });
                resolve(response);
            } catch (err) {
                console.log(err);
                reject(err);
            }
        });
    }

    const onUpdateBtnClick = async () => {
        try {
            const url = config.api.resume.update;
            setLoading(true);
            const payload = getResumeFields();
            await sendPostRequest(url, { ...payload, id: resumeData.common.selectedId, draft: false });
            toast.success('Updated Resume Form');
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
        <div className={styles['rb-viewer-container']}>
            <Loader loading={loading} />
            <div id='rb-header' className={styles['rb-vh']}>
                <div className={styles['rb-vh-left-container']}>
                    <div className={styles['rb-vh-name']}>Resume Preview
                        <span className={styles['rb-vh-resume-title']}> ({resumeData.common.title.value})</span></div>
                </div>
                <div className={styles['rb-vh-right-container']}>
                    <button type="button" className="btn btn-primary" onClick={() => onBackBtnClick()}>Back</button>
                    <button type="button" className="btn btn-primary" onClick={() => onDownloadBtnClick()}>Download</button>
                    {mode == 'update' ?
                        (<button type="button" className="btn btn-primary" onClick={() => onUpdateBtnClick()}>Update</button>) : (mode == 'create' ?
                            (<button type="button" className="btn btn-primary" onClick={() => onCreateBtnClick()}>Create</button>) : null)}
                </div>
            </div>
            <div className={styles['rb-vc']} >
                <div style={{ padding: `${pageMargin.top}mm ${pageMargin.right}mm ${pageMargin.bottom}mm ${pageMargin.left}mm` }} className={styles['rb-print-area-wrapper']}>
                    <div id='print-area' className={styles['rb-print-area']}>
                        <Profile logo={logo} />
                        <div style={breakStyle} className={styles['rb-vh-break']}></div>
                        <div style={wrapperStyle} className={styles['rb-vc-wrapper']}>
                            <div style={leftWrapperStyle} className={styles['rb-vc-left-wrapper']}>
                                <div>
                                    <div style={headerStyles} className={styles['rb-vc-header-label']}>Skills</div>
                                    <TechSkills />
                                </div>
                                <div>
                                    <div style={headerStyles} className={styles['rb-vc-header-label']}>Academics</div>
                                    <Academics />
                                </div>
                            </div>
                            <div style={rightWrapperStyle} className={styles['rb-vc-right-wrapper']}>
                                <div>
                                    <div style={headerStyles} className={styles['rb-vc-header-label']}>Experience</div>
                                    <Projects />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}