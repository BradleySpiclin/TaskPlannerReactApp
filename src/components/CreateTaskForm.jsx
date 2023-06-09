import React, { useState } from "react";
import { createTask } from "../services/api";

function CreateTaskForm() {
  const [unitCode, setUnitCode] = useState("");
  const [name, setName] = useState("");
  const [comments, setComments] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskItem = {
      unitCode,
      name,
      comments,
      dueDate: new Date(dueDate),
      isComplete: false,
      completedDate: null,
    };

    try {
      const response = await createTask(taskItem);
      console.log("Task item created:", response.data); // Log the response data or handle success
      // Reset form fields
      setUnitCode("");
      setName("");
      setComments("");
      setDueDate("");
    } catch (error) {
      console.log("Error creating task item:", error); // Handle error
      console.log(taskItem); // Log the error
    }
  };

  return (
    <div>
      <h2>Create Task Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="unitCode">Unit Code:</label>
          <input
            type="text"
            id="unitCode"
            value={unitCode}
            onChange={(e) => setUnitCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="comments">Comments:</label>
          <input
            type="text"
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="text"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateTaskForm;
