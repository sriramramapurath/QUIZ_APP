// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.jpg'; // import the logo

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <h2></h2>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/add">Add Question</Link>
        <Link to='/edit'>Edit Questions</Link>
      </div>
    </nav>
  );
}
