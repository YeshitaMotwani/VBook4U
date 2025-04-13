// About.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1>About Us</h1>
          <p>
            Welcome to <b>VBook4U</b>, your premier destination for discovering and booking tickets to the most exciting events in your area and beyond. We are passionate about connecting people with unforgettable experiences.
          </p>

          <h4>Our Mission</h4>
          <p>
            Our mission is to simplify the event booking process and provide a seamless, user-friendly platform that caters to all your entertainment needs. We strive to offer a diverse selection of events, from concerts and festivals to theater performances and sports games.
          </p>

          <h4>What We Offer</h4>
          <ul>
            <li>
              <strong>Wide Range of Events:</strong> Explore a vast selection of events tailored to various interests.
            </li>
            <li>
              <strong>Easy Booking:</strong> Our intuitive platform makes booking tickets quick and hassle-free.
            </li>
            <li>
              <strong>Secure Transactions:</strong> We prioritize the security of your personal and payment information.
            </li>
            <li>
              <strong>Customer Support:</strong> Our dedicated support team is here to assist you with any questions or concerns.
            </li>
          </ul>

          <h4>Our Commitment</h4>
          <p>
            We are committed to providing exceptional service and ensuring that your event booking experience is enjoyable and stress-free. Thank you for choosing VBook4U!
          </p>

          <h4>Contact Us</h4>
          <p>
            For any inquiries, please contact us at <a href="/" >info@eventbooking.com</a>.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;