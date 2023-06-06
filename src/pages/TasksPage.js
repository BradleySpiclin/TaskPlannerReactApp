import React from 'react';
import TaskItemList from '../components/TaskItems';

const TasksPage = () => {
  return (
    <div>
        <h2>All tasks in the database</h2>
      <TaskItemList/>
    </div>
  );
};

export default TasksPage;