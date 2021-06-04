import React, { useEffect, useState } from 'react';
import {Modal} from 'react-bootstrap'

function CrosswordModal(props) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(props.show);
    }, [props.show])

    let handleClose = () => setShow(false);

    return (
        <Modal className="text-center text-muted" show={show} onHide={handleClose} centered>
            <Modal.Header>
                <Modal.Title className='w-100'>{props.message}</Modal.Title>
            </Modal.Header>
        </Modal>
    );
}

export default CrosswordModal;