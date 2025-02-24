import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomNav from "../components/Nav/Nav";
import Home from "../pages/home/Home";
import Settings from "../pages/settings/Settings";
import JournalPage from "../pages/journal/JournalPage";
import PageNotFound from "../pages/404/PageNotFound";

const App = () => {
  return (
    <Router basename="/iching-explorer-public/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <BottomNav />
    </Router>
  );
};

export default App;
