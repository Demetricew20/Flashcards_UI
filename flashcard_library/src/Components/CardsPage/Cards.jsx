import { Container, Row, Col, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import {RiArrowLeftSLine, RiArrowRightSLine} from 'react-icons/ri'
import {FaJava} from 'react-icons/fa';
import {BiGhost} from 'react-icons/bi'
import {SiPython, SiHtml5, SiReact, } from 'react-icons/si';
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
        collectionName: "",
        length: null
    })
    const [currentCard, setCurrentCard] = useState({
        currentCard: 0,
        totalCards: 0,
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
        if (currentCard.isFlipped === false && selectedCollection.id){
            setCurrentCard({
                currentCard: currentCard.currentCard,
                isFlipped: true
            })
        }
        if (currentCard.isFlipped === true && selectedCollection.id){
            setCurrentCard({
                currentCard: currentCard.currentCard,
                isFlipped: false
            })
        }
    }

    let cardDeck = [];

    const mapCardDeck = () => {
        cards.cards.forEach((card, i) => {
            if (card.collection === selectedCollection.id){
                cardDeck.push(card)
            }
        })

        let count = currentCard.currentCard + 1;

        if(cardDeck.length === 0){
            return (<p className="card__question-individual">Choose a collection</p>)
        }
        else{
            if(!currentCard.isFlipped){
                return (<div><span>{count}/{cardDeck.length}</span><p className="card__question-individual">{cardDeck[currentCard.currentCard].card_question}</p></div>)
            }
            if(currentCard.isFlipped){
                return (<div><span>{count}/{cardDeck.length}</span><p className="card__answer-individual">{cardDeck[currentCard.currentCard].card_answer}</p></div>)
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
                <Col xs={3} style={{padding: '0'}}><RiArrowLeftSLine className='arrows' onClick={handleCardChangeLeft}/></Col>
                <Col xs={6} style={{padding: '0', display:'flex',justifyContent: 'center'}}>
                <div className="selected__card" id={`${selectedCollection.collectionName}-cards`} onClick={flipCard}>
                    {mapCardDeck()}
                </div>
                </Col >
                <Col xs={3} style={{padding: '0'}}><RiArrowRightSLine className='arrows' onClick={handleCardChangeRight}/></Col>
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
                        <div className='card1' id={`${selectedCollection.collectionName}-cardDeck`}>
                            {!selectedCollection.collectionName ? <box-icon name='ghost' type="solid" animation='fade-up' color="green" size="lg" pull="left" ></box-icon>: <> </>  }
                            {selectedCollection.collectionName === 'Java' ? <FaJava /> : <></>  }
                            {selectedCollection.collectionName === 'Python' ? <SiPython /> : <></>  }
                            {selectedCollection.collectionName === 'HTML5' ? <SiHtml5 /> : <></>  }
                            {selectedCollection.collectionName === 'React' ? <SiReact /> : <></>  }
                        </div>
                        <div className='card2' id={`${selectedCollection.collectionName}-cardDeck`}>
                            {!selectedCollection.collectionName ? <box-icon name='ghost' type="solid" animation='fade-up' color="blue" size="lg" pull="left" ></box-icon>: <> </>  }
                            {selectedCollection.collectionName === 'Java' ? <FaJava /> : <></>  }
                            {selectedCollection.collectionName === 'Python' ? <SiPython /> : <></>  }
                            {selectedCollection.collectionName === 'HTML5' ? <SiHtml5 /> : <></>  }
                            {selectedCollection.collectionName === 'React' ? <SiReact /> : <></>  }
                        </div>
                        <div className='card3' id={`${selectedCollection.collectionName}-cardDeck`}>
                            {!selectedCollection.collectionName ? <box-icon name='ghost' type="solid" animation='fade-up' color="red" size="lg" pull="left" ></box-icon>: <> </>  }
                            {selectedCollection.collectionName === 'Java' ? <FaJava /> : <></>  }
                            {selectedCollection.collectionName === 'Python' ? <SiPython /> : <></>  }
                            {selectedCollection.collectionName === 'HTML5' ? <SiHtml5 /> : <></>  }
                            {selectedCollection.collectionName === 'React' ? <SiReact /> : <></>  }
                        </div>
                    </div>
                </Col>
            </Row>
            </Container>
        </div>
    )
}


export default Cards
