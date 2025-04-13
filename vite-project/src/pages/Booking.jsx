import { useParams,useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import axios from "axios";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/events/${id}`)
      
      .then((res) => 
        setEvent(res.data.event || res.data))
      .catch((err) => console.error("Error fetching event", err));
  }, [id]);

  const handleBooking = () => {
    // alert("Proceed to seat selection and payment!");
    navigate(`/bookings/seat-selection/${id}`);
    // Navigate to SeatSelection page
  };

  if (!event) return <p>Loading...</p>;

  return (
    <Container className="mt-4">
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <Button onClick={handleBooking} variant="success" className="w-100">
        Proceed to Seat Selection
      </Button>
    </Container>
  );
};

export default Booking;
