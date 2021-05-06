import React, { useState } from 'react';
import FlashcardServices from '../../Services/request';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem'

const EditCard = (props) => {
    const [card, setCard] = useState({
        collection: props.collection,
        card_question: props.card_question,
        card_answer: props.card_answer
    });
    const [collection, setCollection] = useState(props.currentCollections);
    
    const editCard = (currentCard) => {
        const data = {
            collection: card.collection,
            card_question: card.card_question,
            card_answer: card.card_answer
        }
        FlashcardServices.updateFlashcard(currentCard.id, currentCard.collection, data)
        .then(response => {
            setCard(data)
            console.log(response)
        })
        .catch(error => {
            console.log(error.response)
        })
    }

    const onChangeQuestion= (event) => {
        setCard({
            ...card, card_question: event.target.value
        });
    }

    const onChangeAnswer = (event) => {
        setCard({
            ...card, card_answer: event.target.value
        });
    }



    return (
        <div>
            <div>
    
                <div className="form-group">
                <label htmlFor="card_question">Question</label>
                <input
                    type="text"
                    className="form-control"
                    id="card_question"
                    placeholder={card.card_answer}
                    required
                    value={card.card_question}
                    onChange={onChangeQuestion}
                    name="card_question"
                />

                </div>
                <div className="form-group">
                <label htmlFor="card_answer">Answer</label>
                <input
                    type="text"
                    className="form-control"
                    id="card_answer"
                    placeholder={card.card_question}
                    required
                    value={card.card_answer}
                    onChange={onChangeAnswer}
                    name="card_answer"
                />
                </div>
                <button onClick={() => editCard(props.card)} className="btn btn-success">
                Submit
                </button>
            </div>
            
        </div>
    )
}

export default EditCard
