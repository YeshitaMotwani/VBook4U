import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setAuth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setAuth(null);
    navigate("/login");
  }, [setAuth, navigate]);

  return <h2>Logging out...</h2>;
};

export default Logout;
