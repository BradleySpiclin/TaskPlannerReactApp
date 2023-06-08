import React from "react";

const NavBar = () => {
  return (
    <nav>
      <p>Procrastinot</p>
      <ul>
        <li>
          <a href="/tasks">Task Overview</a>
        </li>
        <li>
          <a href="/create">Create Task</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
