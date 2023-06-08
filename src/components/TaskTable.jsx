import React, { useState } from "react";
import { updateTask } from "../services/api";
import { deleteTask } from "../services/api";

const TaskTable = ({ taskItems, setTaskItems }) => {
  const handleUpdateTask = (updatedTask) => {
    setTaskItems((prevTaskItems) => {
      return prevTaskItems.map((taskItem) => {
        if (taskItem.id === updatedTask.id) {
          return updatedTask; // Replace the matching task with the updated task
        }
        return taskItem; // Return the unchanged task item
      });
    });
  };

  const handleInputChange = (e, taskId) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setEditedTasks((prevEditedTasks) => ({
      ...prevEditedTasks,
      [taskId]: {
        ...prevEditedTasks[taskId],
        [name]: inputValue,
      },
    }));
  };

  const handleUpdate = (taskId) => {
    const editedTask = {
      ...taskItems.find((taskItem) => taskItem.id === taskId),
      ...editedTasks[taskId],
    };

    // Include all the fields in the editedTask object
    const updatedTask = {
      id: editedTask.id,
      unitCode: editedTask.unitCode,
      name: editedTask.name,
      comments: editedTask.comments,
      dueDate: editedTask.dueDate,
      isComplete: editedTask.isComplete,
      completedDate: editedTask.completedDate,
    };

    console.log("Updated Task:", updatedTask);

    // Update the task using the edited data
    updateTask(updatedTask)
      .then((response) => {
        console.log("Update Response:", response);
        // Use the updated task item data returned by the API
        handleUpdateTask(response.data);
        setIsEditing((prevIsEditing) => ({
          ...prevIsEditing,
          [taskId]: false,
        }));
      })
      .catch((error) => {
        console.log("Update Error:", error);
      });
  };

  const handleCancel = (taskId) => {
    setEditedTasks((prevEditedTasks) => ({
      ...prevEditedTasks,
      [taskId]: taskItems.find((taskItem) => taskItem.id === taskId),
    }));
    setIsEditing((prevIsEditing) => ({
      ...prevIsEditing,
      [taskId]: false,
    }));
  };

  const handleEdit = (taskId) => {
    setIsEditing((prevIsEditing) => ({
      ...prevIsEditing,
      [taskId]: true,
    }));
  };

  const handleDelete = (taskId) => {
    // Call the API to delete the task
    deleteTask(taskId)
      .then((response) => {
        console.log("Delete Response:", response);
        // Remove the deleted task from the taskItems state
        setTaskItems((prevTaskItems) =>
          prevTaskItems.filter((taskItem) => taskItem.id !== taskId)
        );
      })
      .catch((error) => {
        console.log("Delete Error:", error);
      });
  };

  const [editedTasks, setEditedTasks] = useState({});
  const [isEditing, setIsEditing] = useState({});

  return (
    <div>
      <h1>Task Items</h1>
      <table>
        <thead>
          <tr>
            <th>Unit Code</th>
            <th>Name</th>
            <th>Comments</th>
            <th>Due Date</th>
            <th>Completed Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {taskItems.map((taskItem) => (
            <tr key={taskItem.id}>
              <td>{taskItem.unitCode}</td>
              <td>
                {isEditing[taskItem.id] ? (
                  <input
                    type="text"
                    name="name"
                    value={editedTasks[taskItem.id]?.name || taskItem.name}
                    onChange={(e) => handleInputChange(e, taskItem.id)}
                  />
                ) : (
                  taskItem.name
                )}
              </td>
              <td>
                {isEditing[taskItem.id] ? (
                  <input
                    type="text"
                    name="comments"
                    value={
                      editedTasks[taskItem.id]?.comments || taskItem.comments
                    }
                    onChange={(e) => handleInputChange(e, taskItem.id)}
                  />
                ) : (
                  taskItem.comments
                )}
              </td>
              <td>
                {isEditing[taskItem.id] ? (
                  <input
                    type="datetime-local"
                    name="dueDate"
                    value={
                      editedTasks[taskItem.id]?.dueDate || taskItem.dueDate
                    }
                    onChange={(e) => handleInputChange(e, taskItem.id)}
                  />
                ) : (
                  new Date(taskItem.dueDate).toLocaleString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                )}
              </td>
              <td>
                {isEditing[taskItem.id] ? (
                  <input
                    type="datetime-local"
                    name="completedDate"
                    value={
                      editedTasks[taskItem.id]?.completedDate ||
                      taskItem.completedDate
                    }
                    onChange={(e) => handleInputChange(e, taskItem.id)}
                  />
                ) : (
                  new Date(taskItem.completedDate).toLocaleString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                )}
              </td>
              <td>
                {isEditing[taskItem.id] ? (
                  <>
                    <button onClick={() => handleUpdate(taskItem.id)}>
                      Update
                    </button>
                    <button onClick={() => handleCancel(taskItem.id)}>
                      Cancel
                    </button>
                    <button onClick={() => handleDelete(taskItem.id)}>
                      Delete
                    </button>{" "}
                    {/* New delete button */}
                  </>
                ) : (
                  <div>
                    <button onClick={() => handleEdit(taskItem.id)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(taskItem.id)}>
                      Delete
                    </button>{" "}
                    {/* New delete button */}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
