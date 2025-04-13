import { Container, Card, Button, ListGroup, Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [paid, setPaid] = useState(false);

  const {
    selectedSeats = [],
    totalAmount = 0,
    eventId,
    eventDetails = {
      name: "Live Concert",
      date: "2025-04-10",
      time: "7:00 PM",
      venue: "DYPIU Auditorium, Pune"
    }
  } = state || {};

  const handlePayment = () => {
    setPaid(true);
    setTimeout(() => {
      alert("Booking confirmed! Enjoy the event 🎉");
      navigate("/user-dashboard"); // Or to a success page
    }, 1500);
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card style={{ width: "28rem", boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}>
        <Card.Header className="text-center bg-primary text-white">
          <h4>Booking Summary</h4>
        </Card.Header>
        <Card.Body>
          <Card.Title className="text-success">{eventDetails.name}</Card.Title>
          <Card.Text><strong>Date:</strong> {eventDetails.date}</Card.Text>
          <Card.Text><strong>Time:</strong> {eventDetails.time}</Card.Text>
          <Card.Text><strong>Venue:</strong> {eventDetails.venue}</Card.Text>

          <ListGroup variant="flush" className="my-3">
            <ListGroup.Item><strong>Selected Seats:</strong> {selectedSeats}</ListGroup.Item>
            <ListGroup.Item><strong>Total Amount:</strong> ₹{totalAmount}</ListGroup.Item>
            <ListGroup.Item><strong>Payment Mode:</strong> Cash</ListGroup.Item>
          </ListGroup>

          <div className="text-center">
            <Button 
              onClick={handlePayment} 
              variant={paid ? "success" : "primary"} 
              className="w-75"
              disabled={paid}
            >
              {paid ? "Payment Successful" : "Proceed to Pay"}
            </Button>
          </div>

          {paid && <Alert variant="success" className="mt-3">Payment completed! Redirecting...</Alert>}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Payment; 





