import React, {useEffect, useState} from 'react';
import FlashcardServices from '../../Services/request';
import { Container, Col, Row, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import {ImCross} from 'react-icons/im'
import {MdEdit} from 'react-icons/md'
import './CardCollection.css';
import CardModal from '../Modals/CardModal';
import AddCard from '../CardCRUD/AddCard';
import DeleteCard from '../CardCRUD/DeleteCard';
import EditCard from '../CardCRUD/EditCard';
import AddCollection from '../CollectionCRUD/AddCollection';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

const  CardCollections = () => {

const [collections, setCollections] = useState();
const [cards, setCards] = useState();
const [card, setCard] = useState({
    collection: null,
    card_question: '',
    card_answer: ''
})
const [flip, setFlip] = useState({
    clicked : false
})
const [selectedCollection, setSelectedCollection] = useState({
    id: null,
    name: ''
})

useEffect(() => {
    getAllCollections();
}, [card, cards])

useEffect(() => {
    getAllFlashcards();
}, [card])
useEffect(() => {
    
}, [collections])

async function getAllFlashcards(){
    await FlashcardServices.getAllFlashcards()
    .then(response => {
        setCards(response.data)
    })
};
  
async function getAllCollections() {
    await FlashcardServices.getAllCollections()
    .then(response => {
        setCollections(response.data)
    })
};

const handleAddCard = (value) => {
    let array = [...cards]
    array.push(value)
    setCards(array)
}

const handleAddCollection = (value) => {
    let array = [...collections]
    array.push(value)
    setCollections(array)
}

const handleEdit = (value) => {
    setCard({
        collection: value.collection,
        card_question: value.card_question,
        card_answer: value.card_answer
    })
}

const handleDelete = (value) => {
    let array = [...cards]
    let index = array.indexOf(value)
    if( index !== -1){
        array.splice(index, 1);
    }
    setCards(array)
}


const handleClickEventCard = () => {
    if (flip.clicked === false){
        setFlip({clicked: true})
    }
    if (flip.clicked === true){
        setFlip({clicked: false})
    }
}

const collectionSelect = (e) => {
    collections.forEach(collection => {
        let tempId = parseInt(e)
        if (tempId === collection.id){
                setSelectedCollection({
                    id: parseInt(e),
                    name: collection.collection_name
                })
            }

        if(e === null){
            setSelectedCollection({
                id: null,
                name: collection.collection_name
            })
        }
        }
    )
}


let allCollectionsCards = [];
let selectedCollectionCards = [];

    return (
        <div id="card-collections">
            <Container>
                <Row >
                    <Col>
                        <Dropdown className="select__collections" >
                            <DropdownButton className="dropdown__btn" title="Select Card Collection"  >
                                <DropdownItem eventKey={undefined} onSelect={collectionSelect}>Show All</DropdownItem>
                            {collections ? collections.map(collection => (
                                <Dropdown.Item key={collection.id} 
                                eventKey={collection.id} 
                                onSelect={collectionSelect} 
                                >
                                {collection.collection_name}
                                </Dropdown.Item>
                            ))
                            :
                            <></>
                            }
                            </DropdownButton>
                        </Dropdown>
                    </Col>
                </Row>
                <Row>
                    {/* Modal Needs to be added */}
                    <Col><CardModal
                            buttonStyle="add__card-btn"
                            action = 'Add Card'
                            title = 'Add A New Flashcard'
                            content = {<AddCard collections={collections} action={handleAddCard} />}
                        />
                    </Col>
                    <Col><CardModal
                            buttonStyle="add__card-btn"
                            action = 'Add Collection'
                            title = 'Add A New Collection'
                            content = {<AddCollection action={handleAddCollection} />}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    {/* Needs Click function that flips card */}
                    <div className="card__div">
                    {cards ? cards.map((card, i) => {
                        {allCollectionsCards.push(card)}
                        if(selectedCollection.id === undefined || selectedCollection.id === null){
                            return(                      
                            <div key={i} className="cards">
                                
                                <div className="card__item">
                                    <div className='card__text' ><p>{!flip.clicked ? card.card_question : card.card_answer}</p></div>
                                
                                {!flip.clicked ?
                                
                                <div className="card__btn" >
                                <CardModal
                                buttonStyle="card__edit-btn"
                                buttonSize="sm"
                                variant="none"
                                action = {<MdEdit />}
                                title = 'Edit FlashCard'
                                content = {<EditCard
                                            action={handleEdit}
                                            card={card} 
                                            collection={card.collection} 
                                            card_question={card.card_question} 
                                            card_answer={card.card_answer}
                                            />}
                                />
                                <CardModal
                                buttonStyle="card__delete-btn"
                                buttonSize="sm"
                                variant="none"
                                action = {<ImCross />}
                                title = 'Delete FlashCard'
                                content = {<DeleteCard card={card} cards={cards} action={handleDelete} />}
                                />
                                </div>
                            
                                :
                                <></>
                                
                                }
                                    
                                </div>
                                
                            </div>
                        )
                        }
                        if(selectedCollection.id === card.collection){
                            {selectedCollectionCards.push(card)}
                            return(
                            <div key={i}   className="cards">
                                <div className="card__item" id={`${selectedCollection.name}-cards`} >
                                    <div className='card__text' >{!flip.clicked ? card.card_question : card.card_answer}</div>
                                    
                                {!flip.clicked ? 
                                
                                <div className="card__btn" >
                                <CardModal
                                buttonStyle="card__edit-btn"
                                buttonSize="sm"
                                variant="none"
                                action = {<MdEdit  />}
                                title = 'Edit FlashCard'
                                content = {<EditCard 
                                            action={handleEdit}
                                            card={card} 
                                            collection={card.collection} 
                                            card_question={card.card_question} 
                                            card_answer={card.card_answer}
                                            />}
                                />
                                <CardModal
                                buttonStyle="card__delete-btn"
                                buttonSize="sm"
                                variant="none"
                                action = {<ImCross />}
                                title = 'Delete FlashCard'
                                content = {<DeleteCard cards={cards} action={handleDelete} />}
                                />
                                </div>
                            
                                :

                                <></>
                            
                                }

                                </div>
                            </div>
                        )
                            
                        }
                    })
                    :
                        <div>No Collection selected</div>
                    }
                    </div>
                    </Col>
                </Row>
                <Row style={{color: 'white', position: 'relative', top: '20px'}}>{!selectedCollection.id ?
                <Col><div><span>Total Cards: {allCollectionsCards.length}</span></div></Col> 
                :
                <Col><div><span>Total Cards: {selectedCollectionCards.length}</span></div></Col> 
                }
                </Row>
                <Row><Col><Button className="flip__btn" onClick={() => handleClickEventCard()}>Show Answers</Button></Col></Row>

            </Container>
        </div>
    )
}

export default CardCollections