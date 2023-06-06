import React from 'react';

const NavBar = () => {
  return (
    <nav>
        <p>Navigation Bar goes here!</p>
      <ul>
        <li><a href="/tasks">Task Overview</a></li>
        <li><a href="/create">Create Task</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;