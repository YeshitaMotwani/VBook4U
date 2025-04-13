// Privacy.jsx
import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const Privacy = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Body>
              <h1 className="mb-4 text-center">Privacy Policy</h1>
              <p className="lead">
                This Privacy Policy describes how <b>VBook4U</b> collects, uses, and shares information about you when you use our website.
              </p>

              <h2 className="mt-4">Information We Collect</h2>
              <ListGroup variant="flush">
                <ListGroup.Item>Personal information such as your name, email address, phone number, and payment information when you register or purchase tickets.</ListGroup.Item>
                <ListGroup.Item>Usage data, including IP address, browser type, and pages visited.</ListGroup.Item>
              </ListGroup>

              <h2 className="mt-4">How We Use Your Information</h2>
              <ListGroup variant="flush">
                <ListGroup.Item>To process ticket purchases and provide customer support.</ListGroup.Item>
                <ListGroup.Item>To send event updates and promotional offers (you can opt-out).</ListGroup.Item>
                <ListGroup.Item>To improve our website and services.</ListGroup.Item>
              </ListGroup>

              <h2 className="mt-4">Sharing Your Information</h2>
              <ListGroup variant="flush">
                <ListGroup.Item>With event organizers and payment processors to facilitate ticket purchases.</ListGroup.Item>
                <ListGroup.Item>As required by law or to protect our rights.</ListGroup.Item>
              </ListGroup>

              <h2 className="mt-4">Your Choices</h2>
              <p>
                You can manage your account settings and opt out of promotional emails at any time.
              </p>

              <h2 className="mt-4">Contact Us</h2>
              <p>
                If you have any questions, please contact us at <a href="mailto:info@eventbooking.com">info@eventbooking.com</a>.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Privacy;