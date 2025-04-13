import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/bookings/user/${userId}`
          
        );
        console.log("Bookings response:", res.data);
        setBookings(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      }
    };
    fetchBookings();
  }, [userId]);

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Your Bookings</h2>
      <Row>
        {bookings.map((booking) => {
          console.log("Rendering booking with ID:", booking.id);
          return (
            <Col md={4} key={booking.id} className="mb-4">
              <Card
                bg="light"
                text="dark"
                border="primary"
                className="shadow rounded-4"
              >
                <Card.Body>
                  <Card.Title>{booking.event_name}</Card.Title>
                  <Card.Text>
                    <strong>Date:</strong>{" "}
                    {new Date(booking.date).toLocaleDateString()}
                    <br />
                    <strong>Venue:</strong> {booking.venue}
                    <br />
                    <strong>Seat:</strong> {booking.seat_number}
                    <br />
                    <strong>Total Price: ₹</strong> {booking.total_price}
                    <br />
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        booking.status === "cancelled"
                          ? "text-danger"
                          : "text-success"
                      }
                    >
                      {booking.status}
                    </span>
                    <br />
                    {booking.cancelled_at && (
                      <small className="text-muted">
                        Cancelled on:{" "}
                        {new Date(booking.cancelled_at).toLocaleString()}
                      </small>
                    )}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    {booking.status !== "cancelled" && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={async () => {
                          try {
                            console.log(
                              `Booking ID being cancelled: ${booking.id}`
                            );
                            await axios.put(
                              `http://localhost:5000/api/bookings/cancel/${booking.id}`
                            );
                            setBookings((prev) =>
                              prev.map((b) =>
                                b.id === booking.id
                                  ? {
                                      ...b,
                                      status: "cancelled",
                                      cancelled_at: new Date().toISOString(),
                                    }
                                  : b
                              )
                            );
                          } catch (err) {
                            console.error("Cancel failed", err);
                          }
                        }}
                      >
                        Cancel Booking
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default UserDashboard;
