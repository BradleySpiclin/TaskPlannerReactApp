import React from 'react';
import TaskItems from '../components/TaskList';
import NavBar from '../components/NavBar';

const TasksPage = () => {
  return (
    <div>
      <NavBar />
      <TaskItems/>
    </div>
  );
};

export default TasksPage;