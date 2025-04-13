import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [userData, setUserData] = useState({ name: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", userData, { withCredentials: true });

      setSuccess(response.data.message);
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 sec
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed. Try again.");
    }
  };

  return (
    <Container className="mt-5 p-2">
      <h2>Signup</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="col-md-6">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={userData.name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="email" className="col-md-6">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={userData.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="password" className="col-md-6">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={userData.password} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="role" className="col-md-6">
          <Form.Label>Role</Form.Label>
          <Form.Select name="role" value={userData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Form.Select>
        </Form.Group>
        <Button type="submit" className="mt-3">Signup</Button>
      </Form>
    </Container>
  );
};

export default Signup;
