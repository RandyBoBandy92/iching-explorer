// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomNav from "../components/Nav/Nav";
import Home from "../pages/Home";

const BrowserRouter = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
};

export default BrowserRouter;
