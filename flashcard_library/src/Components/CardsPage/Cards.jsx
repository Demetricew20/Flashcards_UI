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
    
        mapCard();
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
    
    
    function mapCard(){
        let array = cards.cards;
        let cardDeck = [];
        if(array){
            for (let i = 0; i < array.length; i++){
                if(array[i].collection === selectedCollection.id){
                    cardDeck.push(array[i])
                }
            }
        }

        console.log('CardDeck',cardDeck[0])
    }

    function handleCardChange(){

    }


    return (
        <div>
            {/* {console.log(collections)}
            {console.log(cards)}
            {console.log(selectedCollection)} */}
            <Container>
            <Row>
                <Col><h2 className='collection__title'>{selectedCollection.collectionName}</h2></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col>
                <div className="selected__card" id={`${selectedCollection.collectionName}-cards`}>
                </div>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col><RiArrowLeftSLine className='arrows'/></Col>
                <Col><Button className='flip__btn'>Flip Card</Button></Col>
                <Col><RiArrowRightSLine className='arrows'/></Col>
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
