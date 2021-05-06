import { Button } from '@material-ui/core';
import React, {useState} from 'react';
import FlashcardServices from '../../Services/request';
import './DeleteCard.css';

const DeleteCard = (props) => {
    const [card, setCard] = useState();

    const deleteCard = (card) => {
        FlashcardServices.deleteFlashcard(card.id, card.collection)
        .then(response => {
            console.log(response); 
        })
        .catch(error => {
            console.log(error.response)
        })
        setCard(card)
    }


    return (
        <div>
            <p>Are you sure you want to delete this card?</p>
            <button className="delete__btn" onClick={() => deleteCard(props.card)}>Delete</button>
        </div>
    )
}

export default DeleteCard
