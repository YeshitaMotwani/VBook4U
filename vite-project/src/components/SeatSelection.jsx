import { useEffect, useState } from "react";
import { Container, Button, Row, Col, Badge, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SeatSelection = () => {
  const { id } = useParams(); // event id
  const navigate = useNavigate();

  const rows = ["A", "B", "C", "D", "E", "F"];
  const seatsPerRow = 6;

  const rowPrices = {
    A: 500,
    B: 500,
    C: 400,
    D: 400,
    E: 300,
    F: 300,
  };

  const generateSeats = () => {
    let seatLayout = [];
    rows.forEach((row) => {
      for (let i = 1; i <= seatsPerRow; i++) {
        seatLayout.push({ id: `${row}${i}`, row, price: rowPrices[row] });
      }
    });
    return seatLayout;
  };

  const allSeats = generateSeats();
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  


  // Fetch already booked seats from backend
  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const res = await axios.get(`/api/bookings/event/${id}`);
        setBookedSeats(res.data); // array of seat numbers
      } catch (error) {
        console.error("Error fetching booked seats:", error);
      }
    };
    
    fetchBookedSeats();

  }, [id]);



  const handleSeatClick = (seatId) => {
    if (selectedSeat === seatId) {
      setSelectedSeat(null);
    } else {
      setSelectedSeat(seatId);
    }
  };

  const calculateTotal = () => {
    const seat = allSeats.find((s) => s.id === selectedSeat);
    return seat?.price || 0;
  };

  const handleConfirm = () => {
    navigate("/payment", {
      state: {
        selectedSeats: [selectedSeat],
        totalAmount: calculateTotal(),
        eventId: id,
        price: calculateTotal()
      },
    });
  };

  // const handleConfirm = () => {
  //   navigate("/payment", {
  //     state: {
  //       selectedSeats: [selectedSeat],
  //       totalAmount: calculateTotal(),
  //       eventId: id,
  //       eventDetails: {
  //         name: event.name,
  //         date: event.date,
  //         time: event.time,
  //         venue: event.venue,
  //       },
  //     },
  //   });
  // };
  

  return (
    <Container className="mt-4 text-center">
      <div
        style={{
          backgroundColor: "red",
          padding: "10px",
          color: "white",
          fontWeight: "bold",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        STAGE
      </div>

      {rows.map((row) => (
        <Row key={row} className="justify-content-center mb-3">
          {[...Array(seatsPerRow)].map((_, idx) => {
            const seatId = `${row}${idx + 1}`;
            const isBooked = bookedSeats.includes(seatId);
            const isSelected = selectedSeat === seatId;

            return (
              <Col xs="auto" key={seatId}>
                <Button
                  variant={
                    isBooked ? "secondary" : isSelected ? "success" : "outline-primary"
                  }
                  disabled={isBooked}
                  onClick={() => handleSeatClick(seatId)}
                >
                  {seatId}
                </Button>
              </Col>
            );
          })}
          <Col xs="auto" className="d-flex align-items-center">
            <Badge bg="info" className="ms-2">₹{rowPrices[row]}</Badge>
          </Col>
        </Row>
      ))}

      {/* 🧾 Selected Seat Summary */}
      {selectedSeat && (
        <Alert variant="info" className="mt-3">
          <strong>Selected Seat:</strong> {selectedSeat} &nbsp;|&nbsp;
          <strong>Price:</strong> ₹{calculateTotal()}
        </Alert>
      )}

      <div className="mt-4">
        <h5>Total Price: ₹{calculateTotal()}</h5>
        <Button
          variant="success"
          disabled={!selectedSeat}
          onClick={handleConfirm}
        >
          Confirm Seat
        </Button>
      </div>
    </Container>
  );
};

export default SeatSelection;
