import { Button } from 'react-bootstrap';
import React, {useState} from 'react';
import FlashcardServices from '../../Services/request';

const DeleteCard = (props) => {
    const deleteCard = (card) => {
        FlashcardServices.deleteFlashcard(card.id, card.collection)
        .then(response => {
            console.log(response); 
        })
        .catch(error => {
            console.log(error.response)
        })

        window.location.reload();
    }


    return (
        <div>
            <p>Are you sure you want to delete this card?</p>
            <Button variant="danger" onClick={() => deleteCard(props.card)}>Delete</Button>
        </div>
    )
}

export default DeleteCard
