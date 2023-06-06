import React, { useEffect, useState } from 'react';
import { getTaskItems } from './api';

function TaskItemList() {
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    fetchTaskItems();
  }, []);

  const fetchTaskItems = async () => {
    try {
      const response = await getTaskItems();
      setTaskItems(response.data);
      console.log('Task Items:', response.data); // Log the response data
    } catch (error) {
      console.log('Error fetching task items:', error);
    }
  };

  return (
    <div>
      <h1>Task Items</h1>
      <ul>
        {taskItems.map((taskItem) => (
          <li key={taskItem.id}>Unit code: {taskItem.unitCode} name : {taskItem.name} comments: {taskItem.comments} due date: {taskItem.dueDate}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskItemList;