import { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Form,
  Modal,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import axios from "axios";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    date: "",
    venue: "",
    available_seats: "",
  });
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState("");

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events");
      setEvents(res.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/events/${editId}`, form);
        setAlert("Event updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/events", form);
        setAlert("Event created successfully!");
      }
      setForm({
        name: "",
        description: "",
        date: "",
        time: "",
        venue: "",
        total_seats: "",
        price: "",
      });
      setEditId(null);
      setShowModal(false);
      fetchEvents();
    } catch (err) {
      console.error(err);
      setAlert("Error saving event");
    }
  };

  const handleEdit = (event) => {
    setEditId(event.id);
    setForm(event);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      fetchEvents();
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4 text-primary fw-bold">Admin Dashboard</h2>

      {alert && <Alert variant="info">{alert}</Alert>}

      <Button
        className="mb-3"
        variant="success"
        onClick={() => setShowModal(true)}
      >
        + Create New Event
      </Button>

      <Table striped bordered hover responsive className="text-center shadow">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Venue</th>
            <th>Available Seats</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.venue}</td>
              <td>{event.available_seats}</td>
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => handleEdit(event)}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(event.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit Event" : "Create Event"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Event Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Venue</Form.Label>
              <Form.Control
                type="text"
                name="venue"
                value={form.venue}
                onChange={handleFormChange}
                required
              />
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label>Available Seats</Form.Label>
              <Form.Control
                type="number"
                name="available_seats"
                value={form.available_seats}
                onChange={handleFormChange}
                required
              />
            </Form.Group> */}

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={form.description}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={form.time}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Total Seats</Form.Label>
              <Form.Control
                type="number"
                name="total_seats"
                value={form.total_seats}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={form.price}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleSubmit}>
              {editId ? "Update Event" : "Create Event"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
