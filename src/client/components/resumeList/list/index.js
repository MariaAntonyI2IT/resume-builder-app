import { useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { sendPostRequest } from './../../../utils/http';
import { populateFields, getTitle } from '../../../store/utils/resume/populate';
import { toast } from 'react-toastify';
import { config } from './../../../utils/config';
import Loader from './../../widget/spinner';
import AlertDialog from './../../widget/alert';
import Permission from './../permission';
import RequestPermission from './../requestPermission';

const List = forwardRef(({ isSharedResume, userList, userMap }, ref) => {
  let userDetails = useSelector(state => state.userProfile);
  const router = useRouter();
  const [resumes, setResumes] = useState([]);
  const [resume, setResume] = useState({});
  const [resumeListLoading, setResumeListLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPermission, setShowPermission] = useState(false);
  const [showReqPermission, setShowReqPermission] = useState(false);
  const [asc, setAsc] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useImperativeHandle(ref, () => ({
    resumes: resumes
  }));

  useEffect(() => {
    try {
      setResumeListLoading(true);
      fetchList(isSharedResume);
      setTimeout(() => {
        setResumeListLoading(false);
      }, 150);
    } catch (err) {
      console.log(err);
      const errorMsg = err.message ? err.message : err.toString();
      toast.error(errorMsg);
      setTimeout(() => {
        setResumeListLoading(false);
      }, 150);
      reject(err);
    }
  }, [isSharedResume, userDetails.userId, refresh]);

  const updateRefresh = () => {
    setRefresh(!refresh);
  }

  const fetchList = (isSharedResume, filter = {
    field: 'lastModified',
    asc: false
  }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const url = isSharedResume ? config.api.resume.shared.list : config.api.resume.list;
        const payload = {
          userId: userDetails.userId,
          filter
        };
        const response = await sendPostRequest(url, payload);
        const resumeList = response.map((res) => {
          let accessPermission = {
            read: true,
            update: true,
            delete: true,
            copy: true,
            share: true,
            providedBy: userDetails.userId
          }
          if (isSharedResume) {
            const doc = res.permissions.find((per) => {
              return per.userId == userDetails.userId
            });
            accessPermission = {
              read: !!doc.access.read,
              update: !!doc.access.update,
              delete: !!doc.access.delete,
              share: !!doc.access.share,
              copy: !!doc.access.copy,
              providedBy: doc.providedBy,
              id: doc._id
            }
          }
          return { ...res, accessPermission }
        });
        setResumes(resumeList);
        resolve(true);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  const onTitleSort = async () => {
    try {
      setResumeListLoading(true);
      await fetchList(isSharedResume, {
        field: 'title',
        asc: !asc
      });
      setAsc(!asc);
      setTimeout(() => {
        setResumeListLoading(false);
      }, 150);
    } catch (err) {
      console.log(err);
      const errorMsg = err.message ? err.message : err.toString();
      toast.error(errorMsg);
      setTimeout(() => {
        setResumeListLoading(false);

      }, 150);
      reject(err);
    }
  }

  const retreiveResume = (resume) => {
    return new Promise(async (resolve, reject) => {
      try {
        const url = config.api.resume.retreive;
        const payload = {
          id: resume._id
        };
        const response = await sendPostRequest(url, payload);
        resolve(response);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  const deleteResume = (resume) => {
    return new Promise(async (resolve, reject) => {
      try {
        const url = isSharedResume ? config.api.resume.permissions.delete : config.api.resume.delete;
        const payload = {
          id: resume._id
        };
        if (isSharedResume) payload['aid'] = [resume.accessPermission.id];
        const response = await sendPostRequest(url, payload);
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }

  const onPreviewClick = async (resume) => {
    try {
      const action = 'read';
      const isPermitted = checkPermission(resume.accessPermission[action]);
      setResume({ ...resume, action });
      if (isPermitted) {
        setLoading(true);
        const response = await retreiveResume(resume);
        if (response) {
          const { profile, techSkills, academics, projects, title } = response;
          populateFields({ id: resume._id, profile, techSkills, academics, projects, title, draft: false });
          router.push({
            pathname: config.path.resume.preview,
            query: { mode: 'preview' }
          });
        }
        setTimeout(() => {
          setLoading(false);
        }, 150);
      } else {
        setShowReqPermission(true);
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

  const onEditBtnClick = async (resume) => {
    try {
      const action = 'update';
      const isPermitted = checkPermission(resume.accessPermission[action]);
      setResume({ ...resume, action });
      if (isPermitted) {
        setLoading(true);
        const response = await retreiveResume(resume);
        if (response) {
          const { profile, techSkills, academics, projects, title, draft } = response;
          populateFields({ id: resume._id, profile, techSkills, academics, projects, title, draft });
          router.push(config.path.resume.update);
        }
        setTimeout(() => {
          setLoading(false);
        }, 150);
      } else {
        setShowReqPermission(true);
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

  const onCopyBtnClick = async (resume) => {
    try {
      const action = 'copy';
      const isPermitted = checkPermission(resume.accessPermission[action]);
      setResume({ ...resume, action });
      if (isPermitted) {
        setLoading(true);
        const response = await retreiveResume(resume);
        if (response) {
          const { profile, techSkills, academics, projects, title } = response;
          const uniqueTitle = getTitle(resumes, title);
          populateFields({ id: undefined, profile, techSkills, academics, projects, title: uniqueTitle, draft: true });
          router.push(config.path.resume.create);
        }
        setTimeout(() => {
          setLoading(false);
        }, 150);
      } else {
        setShowReqPermission(true);
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

  const onDeleteBtnClick = (resume) => {
    const action = 'delete';
    const isPermitted = checkPermission(resume.accessPermission[action]);
    setResume({ ...resume, action });
    if (isPermitted) {
      setShowModal(true);
    } else {
      setShowReqPermission(true);
    }
  }

  const handleClose = () => {
    setShowModal(false);
  }

  const handleProceed = async () => {
    try {
      setLoading(true);
      await deleteResume(resume);
      await fetchList(isSharedResume);
      setShowModal(false);
      setTimeout(() => {
        setLoading(false);
      }, 150);
      toast.success('Resume Deleleted Successfully');
    } catch (err) {
      console.log(err);
      const errorMsg = err.message ? err.message : err.toString();
      toast.error(errorMsg);
      setTimeout(() => {
        setLoading(false);
      }, 150);
    }
  }

  const checkPermission = (permission) => {
    if (isSharedResume && !permission) {
      return false;
    }
    return true;
  }

  const onShareBtnClick = async (resume) => {
    const action = 'share';
    const isPermitted = checkPermission(resume.accessPermission[action]);
    setResume({ ...resume, action });
    if (isPermitted) {
      setShowPermission(true);
    } else {
      setShowReqPermission(true);
    }
  }

  const updateShowPermission = useCallback((show = true) => {
    setShowPermission(show);
  }, [])

  const updateshowReqPermission = useCallback((show = true) => {
    setShowReqPermission(show);
  }, [])



  return (
    <div className={styles['rb-list-container']}>
      <Loader loading={loading} />
      {showPermission &&
        <Permission resume={resume} updateRefresh={updateRefresh} userId={userDetails.userId} show={showPermission} userList={userList} userMap={userMap} updateShowPermission={updateShowPermission} />
      }
      {showReqPermission &&
        <RequestPermission resume={resume} show={showReqPermission} userList={userList} userMap={userMap} updateshowReqPermission={updateshowReqPermission} />
      }
      <AlertDialog show={showModal} header={'Alert !'} body={'Are you sure tou want to delete the resume ?'}
        footerConfirmBtn={`yes`} footerCloseBtn={`No`} handleClose={() => handleClose()} handleProceed={() => handleProceed()} />
      <div className={styles['rb-list-content']}>
        <div className={styles['rb-list-wrapper-container']}>
          <div className={styles['rb-list-table-container']}>
            <Loader loading={resumeListLoading} position={'absolute'} />
            <table>
              <tbody>
                <tr className={[styles['rb-list-wrapper'], styles['rb-list-wrapper-header']].join(' ')}>
                  <th className={styles['rb-resume-name-header']} onClick={() => onTitleSort()}>
                    <div className={styles['rb-resume-header']}>Resume</div>
                    <span className="material-icons">
                      <span className="material-symbols-rounded">
                        <span className="material-symbols-outlined">
                          swap_vert
                        </span>
                      </span>
                    </span>
                  </th>
                  <th className={styles['rb-resume-lm-header']}>
                    <div className={styles['rb-resume-header']}>Last Modified</div>
                  </th>
                  <th className={styles['rb-resume-action-header']}>
                    <div className={styles['rb-resume-header']}>Action  Items</div>
                  </th>
                </tr>
                {resumes.length ?
                  resumes.map((resume, index) => {
                    return (
                      <tr key={resume._id} className={styles['rb-list-wrapper']} >
                        <td className={styles['rb-resume-name-data']}>
                          <div className={styles['rb-resume-name']}>{resume.title}  {resume.draft && <span className={styles['rb-resume-name-cat']}>(draft)</span>}</div>
                          {isSharedResume && <div className={styles['rb-resume-shared-name']}>{userList.length && Object.keys(userMap).length && userList[userMap[resume.accessPermission.providedBy]].label}</div>}
                        </td>
                        <td title={userList.length && Object.keys(userMap).length && userList[userMap[resume.lastUpdatedBy]].label} className={styles['rb-resume-lm-data']}>
                          <div>{new Date(resume.lastModified).toLocaleString('en-US', { hour12: true })}</div>
                        </td>
                        <td className={styles['rb-resume-action-data']}>
                          <div className={styles['rb-resume-edit']} title={'Edit'} onClick={() => onEditBtnClick(resume)}>
                            <span className="material-icons">
                              <span className="material-symbols-rounded">
                                edit
                              </span>
                            </span>
                          </div>
                          <div className={[styles['rb-resume-view'], `${resume.draft ? 'rb-disabled' : ''}`].join(' ')} title={'Preview'} onClick={() => onPreviewClick(resume)}>
                            <span className="material-icons">
                              <span className="material-symbols-rounded">
                                visibility
                              </span>
                            </span>
                          </div>
                          <div className={[styles['rb-resume-copy'], `${resume.draft ? 'rb-disabled' : ''}`].join(' ')} title={`Create From ${resume.title}`} onClick={() => onCopyBtnClick(resume)}>
                            <span className="material-icons">
                              <span className="material-symbols-rounded">
                                content_copy
                              </span>
                            </span>
                          </div>
                          <div className={styles['rb-resume-share']} title={'Share'} onClick={() => onShareBtnClick(resume)}>
                            <span className="material-icons">
                              <span className="material-symbols-rounded">
                                share
                              </span>
                            </span>
                          </div>
                          <div className={styles['rb-resume-delete']} title={'Delete'} onClick={() => onDeleteBtnClick(resume)}>
                            <span className="material-icons">
                              <span className="material-symbols-rounded">
                                delete
                              </span>
                            </span>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                  : (<tr><td className={styles['rb-resume-nodata']} colSpan={4}>No Data Found</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div >
  )
});

export default List;