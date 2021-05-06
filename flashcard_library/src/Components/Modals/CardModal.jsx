import React, { Component, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/button';
import { FormGroup } from '@material-ui/core';
import { FormControl, FormLabel } from 'react-bootstrap';

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
            <Button onClick={showModal} type='button' className={props.buttonStyle}>{props.action}</Button>
            <Modal show={isOpen} onHide={hideModal}>
                <Modal.Header>
                <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.content}
                    {/* <FormGroup>
                        <FormLabel>Flashcard Question</FormLabel>
                        <FormControl type='textarea' placeholder='Add Question' />
                        <FormLabel>Flashcard Answer</FormLabel>
                        <FormControl type='textarea' placeholder='Add Answer' />
                    </FormGroup> */}
                </Modal.Body>
                <Modal.Footer>
                <button onClick={hideModal}>Cancel</button>
                </Modal.Footer>
            </Modal>
            </>
        

    )
}

export default CardModal;
