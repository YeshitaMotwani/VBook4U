import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>{event.name}</Card.Title>
        <Card.Text>{event.description}</Card.Text>
        <Card.Text>
          <strong>Date:</strong> {event.date} | <strong>Venue:</strong> {event.venue}
        </Card.Text>
        {/* change */}
        <Button as={Link} to={`/bookings/${event.id}`} variant="primary" className="w-100">
          Book Now
        </Button>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
