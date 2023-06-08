import React, { useEffect, useState } from "react";
import { getTasks } from "../services/api";
import TaskTable from "./TaskTable";

function TaskItems() {
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    fetchTaskItems();
  }, []);

  const fetchTaskItems = async () => {
    try {
      const response = await getTasks();
      setTaskItems(response.data);
      console.log("Task Items:", response.data); // Log the response data
    } catch (error) {
      console.log("Error fetching task items:", error);
    }
  };

  return (
    <div>
      <TaskTable taskItems={taskItems} setTaskItems={setTaskItems} />
    </div>
  );
}

export default TaskItems;
