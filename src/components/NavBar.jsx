import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <p className="navbar-title">Procrastinot</p>
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/tasks" className="navbar-link">
            Task Overview
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/calendar" className="navbar-link">
            Calendar
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/create" className="navbar-link">
            Create Task
          </Link>
        </li>
      </ul>
      <button className="signout-button">Sign Out</button>
    </nav>
  );
};

export default NavBar;
