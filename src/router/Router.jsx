// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomNav from "../components/Nav/Nav";
import Home from "../pages/home/Home";
import Settings from "../pages/settings/Settings";
import { useEffect } from "react";

const BrowserRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <BottomNav />
    </Router>
  );
};

export default BrowserRouter;
