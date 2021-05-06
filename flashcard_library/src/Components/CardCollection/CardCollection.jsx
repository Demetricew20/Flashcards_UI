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

const  CardCollections = (props) => {

const [collections, setCollections] = useState();
const [cards, setCards] = useState();
const [flip, setFlip] = useState({
    clicked : false
})
const [selectedCollection, setSelectedCollection] = useState()


useEffect(() => {
    getCards()
    getAllCollections()
}, [])

const getCards = () => {
        FlashcardServices.getAllFlashcards()
        .then(response => {
        setCards(response.data)
        })
    }

const getAllCollections = () => {
    FlashcardServices.getAllCollections()
    .then(response => {
    setCollections(response.data)
    })
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
    setSelectedCollection(parseInt(e))
    console.log('Selected Collection >>>', e)
}

const handleClick = (card) => {
    console.log('Clicked on >>', card)
}


    return (
        <div id="card-collections">
            {console.log(cards)}
            <Container>
                <Row >
                    <Col>
                        <Dropdown className="select__collections" >
                            <DropdownButton title="Select Card Collection"  >
                            {collections ? collections.map(collection => (
                                <Dropdown.Item key={collection.id} 
                                eventKey={collection.id} 
                                nSelect={collectionSelect} 
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
                            content = {<AddCard />}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    {/* Needs Click function that flips card */}
                    <div className="card__div">
                    {cards ? cards.map((card, i) => {
                        if(selectedCollection === undefined){
                            return(                        
                            <div key={i} className="cards">
                                
                                <div className="card__item">
                                    <div className='card__text' >{flip.clicked ? card.card_answer : card.card_question}</div>
                                <div className="card__btn" >
                                <CardModal
                                buttonStyle="card__edit-btn"
                                buttonSize="sm"
                                variant="none"
                                action = {<MdEdit  />}
                                title = 'Edit FlashCard'
                                content = {<EditCard currentCollections={collections} 
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
                                content = {<DeleteCard card={card} />}
                                />
                                {/* <Button className="card__edit-btn" variant="outline-secondary" size="sm" >Edit</Button> */}
                                {/* <Button size="sm" variant="outline-danger" >Delete</Button> */}
                                </div>
                                    
                                </div>
                                
                            </div>
                        )
                        }
                        if(selectedCollection === card.collection){
                            return(
                            <div key={i}   className="cards">
                                <div className="card__item">
                                    <div className='card__text' >{flip.clicked ? card.card_answer : card.card_question}</div>
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
                <Row><Col><Button className={"flip__btn"} onClick={() => handleClickEventCard()}>Show Answers</Button></Col></Row>

            </Container>
        </div>
    )
}

export default CardCollections