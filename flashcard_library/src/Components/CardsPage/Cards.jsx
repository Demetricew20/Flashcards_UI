import { Container, Row, Col, Button } from 'react-bootstrap';
import {RiArrowLeftSLine, RiArrowRightSLine} from 'react-icons/ri'
import {BsCardImage} from 'react-icons/bs'
import React from 'react';
import './Cards.css';

function Cards() {
    return (
        <div>
            <Container>
            <Row>
                <Col><h2 className='collection__title'>Collection Name</h2></Col>
            </Row>
            <Row>
                
                <Col><BsCardImage className='selected__card'/></Col>
            </Row>
            <Row>
                <Col><RiArrowLeftSLine className='arrows'/></Col>
                <Col><Button className='flip__btn'>Flip Card</Button></Col>
                <Col><RiArrowRightSLine className='arrows'/></Col>
            </Row>
            <Row className="current__collection-row">
                <Col><label>Current Collection: </label> <Button>React</Button></Col>
            </Row>
            <Row>
                <Col>
                    <div className='card__deck'>
                        <div className='card1'></div>
                        <div className='card2'></div>
                        <div className='card3'></div>
                    </div>
                </Col>
            </Row>
            </Container>
        </div>
    )
}

export default Cards
