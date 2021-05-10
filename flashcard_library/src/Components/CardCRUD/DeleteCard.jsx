import { Button } from 'react-bootstrap';
import React, {useState, useEffect} from 'react';
import FlashcardServices from '../../Services/request';
import { array } from 'prop-types';

const DeleteCard = (props) => {

    async function deleteCard(card){
        await FlashcardServices.deleteFlashcard(card.id, card.collection)
        .then(response => {
            console.log(response);
            
        })
        .catch(error => {
            console.log(error.response)
        })

        props.action(card)
    }


    return (
        <div>
            <p>Are you sure you want to delete this card?</p>
            <Button variant="danger" onClick={() => deleteCard(props.card)}>Delete</Button>
        </div>
    )
}

export default DeleteCard
