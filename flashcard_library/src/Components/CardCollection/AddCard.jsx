import { FormGroup } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import { DropdownButton } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { FormControl, FormLabel } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import FlashcardLibrary from '../../Services/request';

const  AddCard = () => {
    const [collection, setCollection] = useState()
    const [card, setCard] = useState(
        {
            collection: "",
            card_question:"",
            card_answer: "",
            submitted: false
        }
    );

    useEffect(() => {
        getCollections()
        setCollection(collection)
        
    }, [setCollection])

    async function getCollections(){
        await FlashcardLibrary.getAllCollections()
        .then(response => {
            console.log(response)
            setCollection(response.data)
        })
    }

    const createCard = () => {
        const data = {
            collection: card.collection,
            card_question: card.card_question,
            card_answer: card.card_answer,
        }
        FlashcardLibrary.createFlashcard(data)
        .then(data => {
            console.log(data)
            setCard({
                collection: data.collection,
                card_question: data.card_question,
                card_answer: data.card_answer,
                submitted: true
            })
            setCollection(...collection)
        })
        .catch(error => {
            console.log(error.response.data)
        })
        
        newCard()
    }


    //Detects changes 

    // const onChangeCollection = (event) => {
    //     setCard({
    //         collection: event.target.value
    //     });
    // }

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

    const collectionSelect = (e) => {
        setCard({
            ...card, collection: parseInt(e)
        })
        console.log('Selected Collection >>>', card)
    }

    const newCard = () => {
        setCard({
            collection: "",
            card_question:"",
            card_answer: ""
        })
    }

    
        return (
        <div className="submit-form">
            {card.submitted ? (
            <div>
                <h4> Your card was added to the collection!</h4>
                <button className="btn btn-success" onClick={newCard}>
                Add
                </button>
            </div>
            ) : (
            <div>
                <div className="form-group">
                <Dropdown>
                    <DropdownButton title="Select Collection">
                        {collection ? collection.map(item => (
                            <DropdownItem 
                            key={item.id} 
                            eventKey={item.id} 
                            onSelect={collectionSelect}
                            >

                            {item.collection_name}
                            </DropdownItem>
                        ))
                        :
                        <span>No Collections Available</span>
                        }

                        
                    </DropdownButton>
                </Dropdown>
                <input value={card.collection} readOnly/>
                </div>
    
                <div className="form-group">
                <label htmlFor="card_question">Question</label>
                <input
                    type="text"
                    className="form-control"
                    id="card_question"
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
                    required
                    value={card.card_answer}
                    onChange={onChangeAnswer}
                    name="card_answer"
                />
                </div>
                <button onClick={createCard} className="btn btn-success">
                Submit
                </button>
            </div>
            )}
        </div>
        );
}

export default AddCard
