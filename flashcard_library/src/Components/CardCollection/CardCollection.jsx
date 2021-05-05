import React, {useEffect, useState} from 'react';
import FlashcardServices from '../../Services/request';
import { Container, Col, Row, Button, Dropdown } from 'react-bootstrap';
import './CardCollection.css';
import { Children } from 'react';

const  CardCollections = (props) => {

const [collections, setCollections] = useState(null);

const [cards, setCards] = useState(null);


useEffect(() => {
    setCollections(props.collections)
    setCards(props.cards)
    console.log('Collections', collections)
}, [])

// const mapCollectionsDropdown = collections.map(collection => (
//     <Dropdown.Item key={collection}>{collection}</Dropdown.Item>
// ))







    return (
        <div id="card-collections">
            <Container>
                <Row >
                    <Col>
                    <Dropdown className="select__collections">
                        <Dropdown.Toggle>
                            Select Card Collection
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {collections ? collections.map(collection => (
                                <Dropdown.Item key={collection.id}>{collection.collection_name}</Dropdown.Item>
                            ), console.log(collections))
                            :
                            <></>
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    </Col>
                </Row>
                <Row>
                    {/* Modal Needs to be added */}
                    {console.log(collections)}
                    {console.log(cards)}
                    <Col><Button className="add__card-btn">Add New Card</Button></Col>
                </Row>
                <Row>
                    <Col>
                    {/* Needs Click function that flips card */}
                    <div className="card__div">
                    </div>
                    
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default CardCollections
