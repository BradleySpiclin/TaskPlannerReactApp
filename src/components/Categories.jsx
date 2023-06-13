import React, { useEffect, useState } from "react";
import { getCategories } from "../services/api";
import TaskTable from "./TaskTable";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
      console.log("Categories:", response.data); // Log the response data
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  return (
    <div>
      <TaskTable categories={categories} setCategories={setCategories} />
    </div>
  );
}

export default Categories;
