import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import Trails from "./pages/Trails.jsx"; 

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trilhas" element={<Trails />} />
        <Route path="/contato" element={<Contact />} />
      </Routes>
    </Router>
  );
}
