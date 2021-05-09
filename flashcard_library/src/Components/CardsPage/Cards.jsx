import { Container, Row, Col, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import {RiArrowLeftSLine, RiArrowRightSLine} from 'react-icons/ri'
import React, {useState, useEffect} from 'react';
import FlashcardServices from '../../Services/request';
import './Cards.css';
const Cards = () => {

    const [collections, setCollections] = useState({
        collections: [],
        collection_name: "",
    });
    const [cards, setCards] = useState(
        {
            collection: null,
            cards: [],
        }
    );
    const [selectedCollection, setSelectedCollection] = useState({
        id: null,
        collectionName: ""
    })
    const [currentCard, setCurrentCard] = useState({
        currentCard: 0,
        isFlipped: false
    })


    //Having trouble passing props
    useEffect(() => {
        getAllCollections()
        getCards()
    }, [])

    const getCards = () => {
        FlashcardServices.getAllFlashcards()
        .then(response => {
            setCards({
                cards: response.data
            });
        })
        .catch(error => {
            console.log(error);
        } )
        }
    
    const getAllCollections = () => {
        FlashcardServices.getAllCollections()
        .then(response => {
            setCollections({
                collection: response.data
            });
        })
        .catch(error=>{
            console.log(error)
        })
        }

    const collectionSelect = (e) => {
        let tempId = parseInt(e)
        setCards({
            ...cards, collection: tempId
        })
        collections.collection.forEach(item => {
            if (item.id === tempId){
                setSelectedCollection({
                    id: tempId,
                    collectionName: item.collection_name
                })
            }
        })
    };

    const flipCard = () => {
        if (currentCard.isFlipped === false){
            setCurrentCard({
                currentCard: currentCard.currentCard,
                isFlipped: true
            })
        }
        if (currentCard.isFlipped === true){
            setCurrentCard({
                currentCard: currentCard.currentCard,
                isFlipped: false
            })
        }
        console.log(currentCard.isFlipped)
    }

    let cardDeck = [];

    const mapCardDeck = () => {
        cards.cards.forEach(card => {
            if (card.collection === selectedCollection.id){
                cardDeck.push(card)
            }
        })


        if(cardDeck.length === 0){
            return (<p className="card__question-individual">Choose a collection</p>)
        }
        else{
            if(!currentCard.isFlipped){
                return (<p className="card__question-individual">{cardDeck[currentCard.currentCard].card_question}</p>)
            }
            if(currentCard.isFlipped){
                return (<p className="card__answer-individual">{cardDeck[currentCard.currentCard].card_answer}</p>)
            }      
        }
    }
    

    const handleCardChangeRight = () => {
        let count = currentCard.currentCard + 1
        let max = cardDeck.length - 1
        if(count <= max)
        setCurrentCard({
            ...currentCard,
            currentCard: count
        })
        else if(count > max){
            setCurrentCard({
                ...currentCard,
                currentCard: 0
            })
        }
        else{
            setCurrentCard({
                ...currentCard,
                currentCard: 0
            })
        }
    }

    const handleCardChangeLeft = () => {
        let count = currentCard.currentCard - 1
        let max = cardDeck.length - 1
        if(currentCard.currentCard > 0)
        setCurrentCard({
            ...currentCard,
            currentCard: count
        })
        else if (currentCard.currentCard === 0){
            setCurrentCard({
                ...currentCard,
                currentCard: max
            })
        }
        else if(count > max){
            setCurrentCard({
                ...currentCard,
                currentCard: 0
            })
        }
    }


    return (
        <div>
            <Container>
            <Row>
                <Col><h2 className='collection__title'>{selectedCollection.collectionName}</h2></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col>
                <div className="selected__card" id={`${selectedCollection.collectionName}-cards`}>
                    {mapCardDeck()}
                </div>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col><RiArrowLeftSLine className='arrows' onClick={handleCardChangeLeft}/></Col>
                <Col><Button className='flip__btn' id="flip" onClick={flipCard}>Flip Card</Button></Col>
                <Col><RiArrowRightSLine className='arrows' onClick={handleCardChangeRight}/></Col>
            </Row>
            <Row className="current__collection-row">
            <Col>
            <Dropdown>
                    <DropdownButton className="dropdown__btn" title="Select Collection">
                        {collections.collection ? collections.collection.map(item => (
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
            </Col>
            </Row>
            <Row>
                <Col>
                    <div className='card__deck' >
                        <div className='card1' id={`${selectedCollection.collectionName}-cards`}></div>
                        <div className='card2' id={`${selectedCollection.collectionName}-cards`}></div>
                        <div className='card3' id={`${selectedCollection.collectionName}-cards`}></div>
                    </div>
                </Col>
            </Row>
            </Container>
        </div>
    )
}


export default Cards
