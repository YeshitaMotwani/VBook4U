// import { useState } from "react";
// import { Container, Form, Button, Alert } from "react-bootstrap";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = ({ setAuth }) => {
//   const [credentials, setCredentials] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", credentials);
//       setAuth(res.data.user);
//       localStorage.setItem("authToken", res.data.token);
//       navigate(res.data.user.role === "admin" ? "/admin-dashboard" : "/user-dashboard");
//     } catch (err) {
//       setError("Invalid email or password.");
//     }
//   };  

//   return (
//     <Container className="mt-4 p-2">
//       <h2>Login</h2>
//       {error && <Alert variant="danger">{error}</Alert>}
//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="email" className="col-md-5">
//           <Form.Label>Email</Form.Label>
//           <Form.Control type="email" name="email" value={credentials.email} onChange={handleChange} required />
//         </Form.Group>
//         <Form.Group controlId="password" className="col-md-5">
//           <Form.Label>Password</Form.Label>
//           <Form.Control type="password" name="password" value={credentials.password} onChange={handleChange} required />
//         </Form.Group>
//         <Button type="submit" className="mt-3">Login</Button>
//       </Form>
//     </Container>
//   );
// };

// export default Login;

import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setAuth }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", credentials);
      const user = res.data.user;

      setAuth(user);

      // ✅ Save necessary data in localStorage
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("user_id", user.id);
      localStorage.setItem("user_name", user.username || user.name); // adjust depending on your backend
      localStorage.setItem("user_role", user.role);

      // ✅ Redirect to correct dashboard
      navigate(user.role === "admin" ? "/admin-dashboard" : "/user-dashboard");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <Container className="mt-4 p-2">
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" className="col-md-5">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={credentials.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="password" className="col-md-5">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={credentials.password} onChange={handleChange} required />
        </Form.Group>
        <Button type="submit" className="mt-3">Login</Button>
      </Form>
    </Container>
  );
};

export default Login;
