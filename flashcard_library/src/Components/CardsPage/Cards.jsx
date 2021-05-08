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
            isFlipped: false
        }
    );
    const [selectedCollection, setSelectedCollection] = useState({
        id: null,
        collectionName: ""
    })
    const [currentCard, setCurrentCard] = useState({
        currentCard: 0
    })

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

    const handleClickEventCard = () => {
        if (cards.isFlipped === false){
            setCards({
                ...cards,
                isFlipped: true
            })
        }
        if (cards.isFlipped === true){
            setCards({
                ...cards,
                isFlipped: false
            })
        }
    }

    let cardDeck = [];

    const mapCardDeck = () => {
        cards.cards.forEach(card => {
            if (card.collection === selectedCollection.id){
                cardDeck.push(card)
            }
        })

        if(cardDeck.length === 0){
            return (<p className="card__text-individual">Choose a collection</p>)
        }
        else{
            return (<p className="card__text-individual">{cardDeck[currentCard.currentCard].card_question}</p>)
        }
        

    }
    

    const handleCardChangeRight = () => {
        let count = currentCard.currentCard + 1
        let max = cardDeck.length - 1
        if(count <= max)
        setCurrentCard({
            currentCard: count
        })
        else{
            setCurrentCard({
                currentCard: 0
            })
        }
    }

    const handleCardChangeLeft = () => {
        let count = currentCard.currentCard - 1
        let max = cardDeck.length - 1
        if(currentCard.currentCard > 0)
        setCurrentCard({
            currentCard: count
        })
        else if (currentCard.currentCard === 0){
            setCurrentCard({
                currentCard: max
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
                <Col><Button className='flip__btn'>Flip Card</Button></Col>
                <Col><RiArrowRightSLine className='arrows' onClick={handleCardChangeRight}/></Col>
            </Row>
            <Row className="current__collection-row">
            <Col>
            <Dropdown>
                    <DropdownButton title="Select Collection">
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
