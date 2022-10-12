import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function AlertDialog({ show, handleClose, header, body, footerConfirmBtn, footerCloseBtn, handleProceed }) {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {footerCloseBtn}
                    </Button>
                    <Button variant="primary" onClick={handleProceed}>
                        {footerConfirmBtn}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
