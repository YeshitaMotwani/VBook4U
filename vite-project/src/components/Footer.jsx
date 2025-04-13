import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa'; // Import icons

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-4">
      <Container>
        <Row>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>About Us</h5>
            <p>Your one-stop destination for booking tickets to amazing events. We strive to provide a seamless and enjoyable experience.</p>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Contact Us</h5>
            <p>
              <FaEnvelope className="me-2" /> info@eventbooking.com
              <br />
              <FaPhone className="me-2" /> +1 (123) 456-7890
            </p>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-start">
              <a href="#" className="text-light me-3" aria-label="Facebook"><FaFacebook size={20} /></a>
              <a href="#" className="text-light me-3" aria-label="Twitter"><FaTwitter size={20} /></a>
              <a href="#" className="text-light me-3" aria-label="Instagram"><FaInstagram size={20} /></a>
            </div>
          </Col>
        </Row>
        <hr className="text-light my-3" />
        <p className="text-center mb-0">© 2025 Event Booking. All Rights Reserved. | <a href="/privacy" className="text-light">Privacy Policy</a> | <a href="/terms" className="text-light">Terms of Service</a></p>
      </Container>
    </footer>
  );
};

export default Footer;