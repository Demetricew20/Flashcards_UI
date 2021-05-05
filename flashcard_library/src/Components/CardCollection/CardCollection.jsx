import React, {useEffect, useState} from 'react';
import FlashcardServices from '../../Services/request'
import { Container, Col, Row, Button, Dropdown } from 'react-bootstrap';
import './CardCollection.css';

function CardCollections() {

const [collections, setCollections] = useState();
const [card, setCard] = useState();


useEffect(() => {
    
}, [input])




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
                            <Dropdown.Item>React</Dropdown.Item>
                            <Dropdown.Item>Python</Dropdown.Item>
                            <Dropdown.Item>HTML</Dropdown.Item>
                        </Dropdown.Menu>
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
                        {item}
                    </div>
                    
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default CardCollections
