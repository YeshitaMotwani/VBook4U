import "bootstrap/dist/css/bootstrap.min.css";  // Bootstrap CSS (First)
import "./index.css";  // Custom CSS (Overrides Bootstrap if needed)
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/js/bootstrap.bundle.min.js";  // Bootstrap JS (After everything)

// Mount the React App
createRoot(document.getElementById("root")).render(
  <App />
);
