import React, {useEffect, useState} from 'react';
import FlashcardServices from '../../Services/request';
import { Container, Col, Row, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import './CardCollection.css';
import ReactCardFlip from 'react-card-flip'

const  CardCollections = (props) => {

const [collections, setCollections] = useState(null);
const [cards, setCards] = useState(null);
const [flip, setFlip] = useState({
    clicked : false
})
const [selectedCollection, setSelectedCollection] = useState()


useEffect(() => {
    setCollections(props.collections)
    setCards(props.cards)
}, [setCollections, setCards])



const handleClickEventCard = () => {
    if (flip.clicked === false){
        setFlip({clicked: true})
    }
    if (flip.clicked === true){
        setFlip({clicked: false})
    }
}

const collectionSelect = (e) => {
    setSelectedCollection(e)
    console.log('Selected Collection >>>', e)
}


    return (
        <div id="card-collections">
            {/* {console.log(collections)} */}
            {console.log(selectedCollection)}
            <Container>
                <Row >
                    <Col>
                        <Dropdown className="select__collections" >
                            <DropdownButton title="Select Card Collection"  >
                            {collections ? collections.map(collection => (
                                <Dropdown.Item key={collection.id} eventKey={collection.id} onSelect={collectionSelect} >{collection.collection_name}</Dropdown.Item>
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
                    <Col><Button className="add__card-btn">Add New Card</Button></Col>
                </Row>
                <Row>
                    <Col>
                    {/* Needs Click function that flips card */}
                    <div className="card__div">
                    {cards ? cards.map((card, i) => (
                        
                        <div key={i}   className="cards">
                            <div className="card__item">
                                <div className='card__text' >{!flip.clicked ? card.card_answer : card.card_question}</div>
                                </div>
                        </div>
                    ),)
                    :
                        <div></div>
                    }
                    </div>
                    </Col>
                </Row>
                <Row><Button onClick={() => handleClickEventCard()}>Show Answers</Button></Row>

            </Container>
        </div>
    )
}

export default CardCollections