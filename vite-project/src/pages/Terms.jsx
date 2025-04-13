// Terms.jsx
import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const Terms = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Body>
              <h1 className="mb-4 text-center">Terms of Service</h1>
              <p className="lead">
                These Terms of Service govern your use of <b>VBook4U</b>. By using our website, you agree to these terms.
              </p>

              <h4 className="mt-4">Ticket Purchases</h4>
              <ListGroup variant="flush">
                <ListGroup.Item>Subject to availability and confirmation. We may cancel or reschedule events.</ListGroup.Item>
                <ListGroup.Item>You must provide accurate information when purchasing tickets.</ListGroup.Item>
              </ListGroup>

              <h4 className="mt-4">Refunds and Exchanges</h4>
              <ListGroup variant="flush">
                <ListGroup.Item>Vary by event. Check event details for specific policies.</ListGroup.Item>
                <ListGroup.Item>Refunds are typically processed to the original payment method.</ListGroup.Item>
              </ListGroup>

              <h4 className="mt-4">User Conduct</h4>
              <ListGroup variant="flush">
                <ListGroup.Item>Do not use our website for unlawful or prohibited purposes.</ListGroup.Item>
                <ListGroup.Item>Respect intellectual property rights.</ListGroup.Item>
              </ListGroup>

              <h4 className="mt-4">Intellectual Property</h4>
              <p>
                All content is protected by copyright and other intellectual property laws.
              </p>

              <h4 className="mt-4">Limitation of Liability</h4>
              <p>
                We are not liable for damages arising from your use of our website.
              </p>

              <h4 className="mt-4">Changes to These Terms</h4>
              <p>
                We may update these terms. We will notify you by posting the new terms.
              </p>

              <h4 className="mt-4">Contact Us</h4>
              <p>
                If you have questions, contact us at <a href="mailto:info@eventbooking.com">info@eventbooking.com</a>.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Terms;