import { useState, useRef, useEffect } from 'react';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { populateFields, getTitle } from '../../store/utils/resume/populate';
import { sendPostRequest } from './../../utils/http';
import { toast } from 'react-toastify';
import List from './list';
import { config } from './../../utils/config';
import Loader from './../widget/spinner';

export default function ResumeList() {
  const router = useRouter();
  const [isSharedResume, setIsSharedResume] = useState(false);
  const listRef = useRef();
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [userMap, setUserMap] = useState({});

  useEffect(() => {
    try {
      setLoading(true);
      fetchList();
      setTimeout(() => {
        setLoading(false);
      }, 150);
    } catch (err) {
      console.log(err);
      const errorMsg = err.message ? err.message : err.toString();
      toast.error(errorMsg);
      setTimeout(() => {
        setLoading(false);
      }, 150);
      reject(err);
    }
  }, []);

  const fetchList = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const url = config.api.users.list;
        const response = await sendPostRequest(url);
        const userMap = {};
        const userList = response.map((res, index) => {
          userMap[res.userId] = index;
          return { label: res.userName, value: res.userId, mail: res.userMail }
        });
        setUserMap(userMap)
        setUserList(userList);
        resolve(true);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  const onCreateBtnClick = async () => {
    const title = getTitle([]);
    populateFields({ id: undefined, profile: undefined, techSkills: undefined, academics: undefined, projects: undefined, title, draft: true });
    router.push(config.path.resume.create);
  }

  const onPreferenceBtnClick = async () => {
    router.push(config.path.preference.edit);
  }

  const onResumeHeaderClick = (isSharedResume) => {
    setIsSharedResume(isSharedResume);
  }

  return (
    <div className={styles['rb-list-container']}>
      <Loader loading={loading} />
      <div className={styles['rb-list-header']}>
        <div className={styles['rb-list-header-name-container']}>
          <div className={[styles['rb-list-header-name'], `${isSharedResume ? '' : styles['rb-list-active']}`].join(' ')} onClick={() => onResumeHeaderClick(false)}>My Resumes</div>
          <div className={styles['rb-list-header-seperator']}>
          </div>
          <div className={[styles['rb-list-header-name'], `${isSharedResume ? styles['rb-list-active'] : ''}`].join(' ')} onClick={() => onResumeHeaderClick(true)}>Shared Resumes</div>
        </div>
        <div className={styles['rb-list-right-wrapper']}>
          <div className={styles['rb-list-create']} onClick={() => onCreateBtnClick()}>
            <button type="button" className="btn btn-primary">Create</button>
          </div>
          <div className={styles['rb-resume-settings']} title={'Preference'} onClick={() => onPreferenceBtnClick()}>
            <span className="material-icons">
              <span className="material-symbols-rounded">
                settings
              </span>
            </span>
          </div>
        </div>
      </div>
      <List isSharedResume={isSharedResume} userList={userList} userMap={userMap} ref={listRef} />
    </div >
  )
}