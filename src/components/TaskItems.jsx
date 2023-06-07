import React, { useEffect, useState } from 'react';
import { getTaskItems } from '../services/api';
import TaskItemsTable from './TaskItemsTable';

function TaskItems() {
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
      <TaskItemsTable taskItems={taskItems} /> {/* Render the TaskItemsTable component */}
    </div>
  );
}

export default TaskItems;