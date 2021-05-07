import React, { Component, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/button';

const CardModal = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    const showModal = () => {
        setIsOpen(true);
    }
    
    const hideModal = () => {
        setIsOpen(false);
    }

    return (
            <>
            <Button size={props.buttonSize} onClick={showModal} variant={props.variant} type='button' className={props.buttonStyle}>{props.action}</Button>
            <Modal show={isOpen} onHide={hideModal}>
                <Modal.Header>
                <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.content}
                </Modal.Body>
                <Modal.Footer>
                <button onClick={hideModal}>Cancel</button>
                </Modal.Footer>
            </Modal>
            </>
        

    )
}

export default CardModal;
