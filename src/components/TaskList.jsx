import React, { useEffect, useState } from "react";
import { getAllTasks, getAllCategories } from "../services/api";
import TaskTable from "./TaskTable";

function TaskList() {
  const [categories, setCategories] = useState([]);
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const taskItemsResponse = await getAllTasks(); // Fetch all tasks
      setTaskItems(taskItemsResponse.data);
      console.log("Task Items:", taskItemsResponse.data); // Log the taskItemsResponse data

      const categoriesResponse = await getAllCategories(); // Fetch all categories
      setCategories(categoriesResponse.data);
      console.log("Categories:", categoriesResponse.data); // Log the categoriesResponse data
    } catch (error) {
      console.log("Error fetching items:", error);
    }
  };

  // Passing the taskItems and categories as props to the TaskTable component.
  return (
    <div>
      <TaskTable
        taskItems={taskItems}
        setTaskItems={setTaskItems}
        categories={categories}
        setCategories={setCategories}
      />
    </div>
  );
}

export default TaskList;
