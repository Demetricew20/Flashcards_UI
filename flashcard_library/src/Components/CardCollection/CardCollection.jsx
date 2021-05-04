import React from 'react';
import { Container, Col, Row, Button, Dropdown } from 'react-bootstrap';
import './CardCollection.css';

function CardCollections() {

let array = [1,2,3,4,5,6,7,8,9,10]

const item = array.map(num => (
    <div key={num} className="cards">
        <div className="card__item">{num}</div>
    </div>
))





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
