import React from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap';
import {SiPython, SiHtml5} from 'react-icons/si';
import './Landing.css';

function Landing() {



    return (
        <div className="main__content">
        <Container>
          <Row>
            <Col><p className="title">Stack Study</p></Col>
          </Row>
          <Row>
            <Col><SiPython className="icons"/></Col>
            <Col><SiPython className="icons"/></Col>
            <Col><SiPython className="icons"/></Col>
          </Row>
          <Row>
            <Col><a href="/cards"><Button className="landing__btn">Time To Study!</Button></a></Col>
          </Row>
        </Container>
      </div>
    )
}

export default Landing
