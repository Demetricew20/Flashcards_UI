import React, {useState, useEffect} from 'react';
import { DropdownButton } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import FlashcardLibrary from '../../Services/request';

const  AddCard = (props) => {
    const [collection, setCollection] = useState(props.collections);
    const[selectedCollection, setSelectedCollection] = useState({
        id: null,
        collectionName: ""
    });
    const [card, setCard] = useState(
        {
            collection: "",
            card_question:"",
            card_answer: "",
            submitted: false
        }
    );

    useEffect(() => {
        
    }, [props])

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
            setCollection(...collection, collection)
        })
        .catch(error => {
            console.log(error.response.data)
        })
        
        newCard()
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

    const collectionSelect = (e) => {
        let tempId = parseInt(e)
        setCard({
            ...card, collection: tempId
        })
        collection.forEach(item => {
            if (item.id === tempId){
                setSelectedCollection({
                    id: tempId,
                    collectionName: item.collection_name
                })
            }
        });


        console.log('Selected Collection >>>', e)
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
                <div className="form-group" style={{display: 'flex'}}>
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
                <input style={{textAlign: 'center'}} value={selectedCollection.collectionName} readOnly/>
                </div>
    
                <div className="form-group">
                <label htmlFor="card_question">Question</label>
                <textarea
                    type="textarea"
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
                <textarea
                    type="textarea"
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
