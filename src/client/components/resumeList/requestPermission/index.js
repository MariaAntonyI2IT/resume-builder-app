import { useEffect, useState, memo } from 'react';
import styles from './index.module.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Loader from '../../widget/spinner';

const RequestPermission = memo(({ show, resume, userList, userMap, updateshowReqPermission }) => {

  const [loading, setLoading] = useState(false);
  const [permDetails, setPermDetails] = useState({});

  const permForm = [
    { label: 'Read', key: 'read', type: 'checkbox', disabled: true, value: permDetails.read },
    { label: 'Update', key: 'update', type: 'checkbox', disabled: false, value: permDetails.update },
    { label: 'Copy', key: 'copy', type: 'checkbox', disabled: false, value: permDetails.copy },
    { label: 'Delete', key: 'delete', type: 'checkbox', disabled: false, value: permDetails.delete },
    { label: 'Share', key: 'share', type: 'checkbox', disabled: false, value: permDetails.share },
  ];

  useEffect(() => {
    try {
      setLoading(true);
      setPermDetails({
        read: resume.accessPermission.read,
        update: resume.accessPermission.update,
        copy: resume.accessPermission.copy,
        delete: resume.accessPermission.delete,
        share: resume.accessPermission.share
      });
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

  const handleClose = () => {
    updateshowReqPermission(false);
  }

  const handleBtnGroup = (e, key) => {
    const _permDetails = { ...permDetails };
    _permDetails[key] = !_permDetails[key];
    setPermDetails(_permDetails);
  };

  return (
    <>
      <Modal className={styles['rb-req-perm-modal']} scrollable={true} centered={true} style={{ position: 'relative' }} show={show} onHide={() => handleClose()}>
        <Loader loading={loading} position={'absolute'} />
        <Modal.Header closeButton>
          <Modal.Title className={styles['rb-req-perm-modal-title']}>Request access ({resume.title})</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles['rb-req-perm-modal-body']}>
          <div className={styles['rb-req-perm-container']}>
            <div className={styles['rb-req-perm-list']}>
              <div className={styles['rb-req-perm-desc']}>You do not have the access to <b>{resume.action}</b> the resume. Please raise the request to <b>{userList.length && Object.keys(userMap).length && userList[userMap[resume.userId]].label}</b>.</div>
              <div className={[styles[`rb-req-perm-list-content`], `btn-group`].join(' ')}>
                {permForm.map((perm) => {
                  return (
                    <button key={perm.key} disabled={perm.disabled} onClick={(e) => handleBtnGroup(e, perm.key)} type="button" className={[styles[`rb-req-perm-${perm.key}`], `btn btn-light`, `${perm.value ? styles['rb-req-perm-active'] : ''}`].join(' ')}>{perm.label}</button>
                  )
                })}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleClose()}>
            Request
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
});

export default RequestPermission;