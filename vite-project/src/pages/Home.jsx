import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
// import EventCard from "../components/EventCard";
import axios from "axios";

// Default events displayed initially
const initialEvents = [
  {
    id: 101,
    name: "Drama Night",
    image: "src/assets/images/DramaNight.png",
    description: "Experience a mesmerizing theatrical performance.",
    date: "April 10, 2025",
    time: "7:00 PM",
    venue: "Shanmukhananda Hall, Mumbai",
    total_seats: 120,
    available_seats: 120,
  },
  {
    id: 102,
    name: "Stand-up Comedy",
    image: "src/assets/images/StandupComedy.png",
    description: "Laugh out loud with top comedians.",
    date: "April 15, 2025",
    time: "8:00 PM",
    venue: "Canvas Laugh Club, Mumbai",
    total_seats: 200,
    available_seats: 180,
  },
  {
    id: 103,
    name: "Rock Concert",
    image: "src/assets/images/RockConcert.png",
    description: "Enjoy electrifying music performances.",
    date: "April 20, 2025",
    time: "9:00 PM",
    venue: "Jawaharlal Nehru Stadium, Delhi",
    total_seats: 180,
    available_seats: 160,
  },
];

const Home = ({ isAuthenticated }) => {
  const [events, setEvents] = useState(initialEvents);

  useEffect(() => {
    //   axios
    //     .get("http://localhost:5000/api/events")
    //     .then((res) => {
    //       console.log(res.data)
    //       const uniqueEvents = res.data.filter(
    //         (event) => !initialEvents.some((e) => e.id === event.id)
    //       );
    //       setEvents([...initialEvents, ...uniqueEvents]);
    //     })
    //     .catch((err) => console.error("Error fetching events", err));
    // }, []);
    axios
      .get("http://localhost:5000/api/events")
      .then((res) => console.log(res.data))
      .catch((error) => {
        if (error.response) {
          console.error(
            "Server responded with a status:",
            error.response.status
          );
          console.error("Data:", error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
      });
  }, []);

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Upcoming Events</h1>
      <Row>
        {events.length === 0 ? (
          <p className="text-center">No events available at the moment.</p>
        ) : (
          events.map((event, index) => (
            <Col
              key={event.id || event - `${index}`}
              md={6}
              lg={4}
              className="mb-4"
            >
              <Card className="shadow-sm">
                <div style={{ height: "250px", overflow: "hidden" }}>
                  {" "}
                  {/* Added div to control image size */}
                  <Card.Img
                    variant="top"
                    src={event.image}
                    alt={event.name}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }} // Added style to make the image cover the div
                  />
                </div>
                <Card.Body>
                  <Card.Title>{event.name}</Card.Title>
                  <Card.Text>
                    {event.description} <br />
                    <strong>Time:</strong> {event.time} <br />
                    <strong>Venue:</strong> {event.venue}
                    <br></br>
                    <strong>Total Seats:</strong> {event.total_seats}
                    <br></br>
                    <strong>Available Seats:</strong> {event.available_seats}
                    <br></br>
                    <strong>Date:</strong>{" "}
                    {new Date(event.date).toLocaleDateString()}
                  </Card.Text>
                  {isAuthenticated ? (
                    <Button
                      as={Link}
                      to={`/bookings/${event.id}`}
                      variant="primary"
                      className="w-100"
                    >
                      Book Now
                    </Button>
                  ) : (
                    <Button
                      as={Link}
                      to="/login"
                      variant="secondary"
                      className="w-100"
                    >
                      Login to Book
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Home;
