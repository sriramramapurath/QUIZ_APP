// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddQuestion from './pages/AddQuestion';
import EditQuestions from './pages/EditQuestions';
import Success from './pages/Success';
export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddQuestion />} />
        <Route path="/edit" element={<EditQuestions />} />
<Route path="/success" element={<Success />} />

      </Routes>
    </Router>
  );
}
