import { useEffect, useState, memo } from 'react';
import styles from './index.module.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { sendPostRequest } from './../../../utils/http';
import { toast } from 'react-toastify';
import { config } from './../../../utils/config';
import Loader from './../../widget/spinner';

const initialPerm = {
  read: true,
  update: false,
  copy: false,
  delete: false,
  share: false
};

const Permission = memo(({ show, resume, userId, updateRefresh, userList, userMap, updateShowPermission }) => {
  const [loading, setLoading] = useState(false);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [users, setUsers] = useState([]);
  const [removeDocs, setRemoveDocs] = useState([]);
  const [ddlError, setDdlError] = useState(false);
  const [permDetails, setPermDetails] = useState(initialPerm);
  const [permissionList, setPermissionList] = useState([]);

  const permForm = [
    { label: 'Read', key: 'read', type: 'checkbox', disabled: true, value: permDetails.read },
    { label: 'Update', key: 'update', type: 'checkbox', disabled: !resume.accessPermission.update, value: permDetails.update },
    { label: 'Copy', key: 'copy', type: 'checkbox', disabled: !resume.accessPermission.copy, value: permDetails.copy },
    { label: 'Delete', key: 'delete', type: 'checkbox', disabled: !resume.accessPermission.delete, value: permDetails.delete },
    { label: 'Share', key: 'share', type: 'checkbox', disabled: !resume.accessPermission.share, value: permDetails.share },
  ];

  useEffect(() => {
    try {
      setLoading(true);
      updatePermisisons();
      setPermDetails(initialPerm);
      setUsers([]);
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
    }
  }, [resume._id]);

  const updatePermisisons = () => {
    const uList = JSON.parse(JSON.stringify(userList));
    const permDetails = (resume.permissions || []).map((doc) => {
      const matchedUserIndex = uList.findIndex(d => d.value == doc.userId);
      if (matchedUserIndex != -1) uList.splice(matchedUserIndex, 1);
      return {
        users: {
          id: doc.userId,
          name: userList[userMap[doc.userId]].label,
          mail: userList[userMap[doc.userId]].mail
        },
        id: doc._id,
        type: !!doc.access.update ? 'Editor' : 'Reader',
        isDelete: userId != doc.userId
      }
    });
    permDetails.unshift({
      users: {
        id: resume.userId,
        name: userList[userMap[resume.userId]].label,
        mail: userList[userMap[resume.userId]].mail
      },
      id: '',
      type: 'Owner',
      isDelete: false
    });
    const matchedUserIndex = uList.findIndex(d => d.value == resume.userId);
    if (matchedUserIndex != -1) uList.splice(matchedUserIndex, 1);
    setPermissionList(permDetails);
    setFilteredUserList(uList);
  }

  const validateForm = () => {
    if (users.length || removeDocs.length) {
      return true;
    } else {
      setDdlError(true);
      return false;
    }
  }

  const handleDdlChange = (selectedOption) => {
    setUsers(selectedOption);
  };

  const handleBtnGroup = (e, key) => {
    const _permDetails = { ...permDetails };
    _permDetails[key] = !_permDetails[key];
    setPermDetails(_permDetails);
  };

  const addPermission = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const url = config.api.resume.permissions.add;
        setLoading(true);
        const payload = {
          users: users.map(user => user.value),
          id: resume._id,
          userId,
          access: permDetails
        };
        await sendPostRequest(url, payload);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  const removePermission = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const url = config.api.resume.permissions.delete;
        setLoading(true);
        const payload = {
          id: resume._id,
          aid: removeDocs
        };
        await sendPostRequest(url, payload);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  const onShareBtnClick = async () => {
    try {
      if (validateForm()) {
        await removePermission();
        await addPermission();
        setTimeout(() => {
          setLoading(false);
          updateShowPermission(false);
          updateRefresh();
          toast.success(`Provided Access`);
        }, 150);
      } else {
        toast.error('Please fill the mandatory fields');
      }
    } catch (err) {
      console.log(err);
      const errorMsg = err.message ? err.message : err.toString();
      setTimeout(() => {
        setLoading(false);
        toast.error(errorMsg);
      }, 150);
    }
  }

  const onRemoveBtnClick = (index) => {
    const permList = [...permissionList];
    const uList = [...filteredUserList];
    uList.push({ label: permList[index].users.name, value: permList[index].users.id, mail: permList[index].users.mail });
    setFilteredUserList(uList);
    setRemoveDocs([...removeDocs, permList[index].id]);
    permList.splice(index, 1);
    setPermissionList(permList);
  }

  const handleClose = () => {
    updateShowPermission(false);
  }

  return (
    <>
      <Modal className={styles['rb-perm-modal']} scrollable={true} centered={true} style={{ position: 'relative' }} show={show} onHide={() => handleClose()}>
        <Loader loading={loading} position={'absolute'} />
        <Modal.Header closeButton>
          <Modal.Title className={styles['rb-perm-modal-title']}>Share Resume ({resume.title})</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles['rb-perm-modal-body']}>
          <div className={styles['rb-perm-container']}>
            <div className={styles['rb-perm-seperator']}>Users</div>
            <div className={styles['rb-user-ddl-container']}>
              <span className={styles['rb-form-mandatory']}>*</span>
              <Select
                className={[styles['rb-perm-dd-name'], `${ddlError ? styles['rb-form-error'] : ''}`].join(' ')}
                value={users}
                instanceId= {'rb-perm-dd'}
                isMulti={true}
                onChange={(selectedOption) => handleDdlChange(selectedOption)}
                options={filteredUserList}
              />
            </div>
            <div className={styles['rb-perm-wrapper']}>
              <div className={styles['rb-perm-list']}>
                <div className={styles['rb-perm-seperator']}>Allowed permissions</div>
                <div className={[styles[`rb-perm-list-content`], `btn-group`].join(' ')}>
                  {permForm.map((perm) => {
                    return (
                      <button key={perm.key} disabled={perm.disabled} onClick={(e) => handleBtnGroup(e, perm.key)} type="button" className={[styles[`rb-perm-${perm.key}`], `btn btn-light`, `${perm.value ? styles['rb-perm-active'] : ''}`].join(' ')}>{perm.label}</button>
                    )
                  })}
                </div>
              </div>
              <div className={styles['rb-perm-shared-list']}>
                <div className={styles['rb-perm-seperator']}>People with access</div>
                <div className={styles['rb-perm-shared-list-content']}>
                  {permissionList.map((permissions, index) => {
                    return (<div key={permissions.users.id} className={styles['rb-perm-shared-list']}>
                      <div className={styles['rb-perm-sl-left-wrapper']}>
                        <div className={styles['rb-perm-shared-list-avatar']}>{permissions.users.name[0]}</div>
                        <div className={styles['rb-perm-shared-list-text']}>
                          <div className={styles['rb-perm-shared-list-name']}>{permissions.users.name}</div>
                          <div className={styles['rb-perm-shared-list-mail']}>{permissions.users.mail}</div>
                        </div>
                      </div>
                      <div className={styles['rb-perm-sl-right-wrapper']}>
                        <div className={styles['rb-perm-shared-list-type']}>{permissions.type}</div>
                        <div className={[styles['rb-perm-shared-list-delete'], `${!permissions.isDelete ? 'rb-disabled' : ''}`].join(' ')} onClick={() => onRemoveBtnClick(index)}>
                          <span className="material-icons">
                            <span className={"material-symbols-rounded"}>
                              cancel
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>)
                  })}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => onShareBtnClick()}>
            Share
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
});

export default Permission;