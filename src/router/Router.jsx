// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomNav from "../components/Nav/Nav";
import Home from "../pages/home/Home";
import Settings from "../pages/settings/Settings";
import JournalPage from "../pages/journal/JournalPage";

const BrowserRouter = () => {
  return (
    <Router basename="/iching-explorer">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <BottomNav />
    </Router>
  );
};

export default BrowserRouter;
