import React, { useState, useEffect } from "react";
import { updateTask } from "../services/api";
import { deleteTask } from "../services/api";
import { getTaskById } from "../services/api";
import "../styles/tasktable.css";
import "../styles/variables.css";

// temporary icons
import completeIcon from "../icons/checked.png";
import deleteIcon from "../icons/delete.png";
import editIcon from "../icons/edit.png";
import cancelIcon from "../icons/cancel.png";

const TaskTable = ({ taskItems, setTaskItems, categories, setCategories }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [editedTasks, setEditedTasks] = useState({});
  const [isEditing, setIsEditing] = useState({});

  useEffect(() => {
    // effect will only be triggered when 'activeTab' is initially 'null'
    // and not on subsequent 'taskItems' changes
    if (taskItems.length > 0 && activeTab === null) {
      setActiveTab(taskItems[0].categoryId);
    }
  }, [taskItems, activeTab]);

  const handleTabClick = (categoryId) => {
    setActiveTab(categoryId);
  };

  const formattedDueDate = (dueDate) => {
    const date = new Date(dueDate);

    // Get the components of the date
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "pm" : "am";

    // Format the date
    const formattedDate = `${day} ${month} ${year} ${hours % 12 || 12}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;

    return formattedDate;
  };

  const getDueDays = (dueDate, isComplete) => {
    if (isComplete) {
      return { text: "Completed", className: "completed" };
    }
    // Get the current date
    const currentDate = new Date();

    // Convert the due date to a Date object if it's a string
    const parsedDueDate =
      typeof dueDate === "string" ? new Date(dueDate) : dueDate;

    // Convert both dates to milliseconds
    const dueDateMs = parsedDueDate.getTime();
    const currentDateMs = currentDate.getTime();

    // Calculate the difference in milliseconds
    const timeDiffMs = dueDateMs - currentDateMs;

    // Convert the difference to days
    const daysDiff = Math.ceil(timeDiffMs / (1000 * 60 * 60 * 24));

    // Construct string for the appropriate output
    if (daysDiff === 0) {
      return { text: "Due today", className: "due-soon" };
    } else if (daysDiff < 0) {
      const absDaysDiff = Math.abs(daysDiff);
      const days = absDaysDiff > 1 ? "days" : "day";
      return {
        text: `Overdue by ${absDaysDiff} ${days}`,
        className: "overdue",
      };
    } else if (daysDiff <= 7) {
      const days = daysDiff > 1 ? "days" : "day";
      return { text: `Due in ${daysDiff} ${days}`, className: "due-soon" };
    } else {
      const days = daysDiff > 1 ? "days" : "day";
      return { text: `Due in ${daysDiff} ${days}`, className: "active" };
    }
  };

  const handleInputChange = (e, taskId) => {
    const { name, value } = e.target;

    setEditedTasks((prevEditedTasks) => ({
      ...prevEditedTasks,
      [taskId]: {
        ...prevEditedTasks[taskId],
        [name]: value,
      },
    }));
  };

  const handleUpdate = (taskId) => {
    const editedTask = {
      ...taskItems.find((taskItem) => taskItem.id === taskId),
      ...editedTasks[taskId],
    };

    const updatedTask = {
      id: editedTask.id,
      name: editedTask.name,
      comments: editedTask.comments,
      dueDate: editedTask.dueDate,
      isComplete: editedTask.isComplete,
      categoryId: editedTask.categoryId,
    }

    // console.log("Updated Task:", updatedTask);
    
    updateTask(updatedTask)
      .then((response) => {
        const updatedTaskFromAPI = response.data;

        setTaskItems((prevTaskItems) => {
          return prevTaskItems.map((taskItem) => {
            if (taskItem.id === updatedTaskFromAPI.id) {
              return updatedTaskFromAPI;
            }
            return taskItem;
          });
        });

        setIsEditing((prevIsEditing) => ({
          ...prevIsEditing,
          [taskId]: false,
        }));

        getTaskById(taskId)
          .then((taskResponse) => {
            const updatedTaskItem = taskResponse.data;

            setTaskItems((prevTaskItems) => {
              return prevTaskItems.map((taskItem) => {
                if (taskItem.id === updatedTaskItem.id) {
                  return updatedTaskItem;
                }
                return taskItem;
              });
            });
          })
          .catch((error) => {
            console.log("Fetch Task Error:", error.response.data);
          });
        // console.log("Task updated successfully");
      })
      .catch((error) => {
        console.log("Update Error:", error.response.data);
      });
  };


  const handleStatus = (taskId) => {
    setTaskItems((prevTaskItems) => {
      return prevTaskItems.map((taskItem) => {
        if (taskItem.id === taskId) {
          return {
            ...taskItem,
            isComplete: true,
          };
        }
        return taskItem;
      });
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

  const filteredTasks = activeTab
    ? taskItems.filter((taskItem) => taskItem.categoryId === activeTab)
    : taskItems;

  return (
    <div className="section">
      <h1>Task Items</h1>

      <div className="task-tab">
        {/* Uses the 'categories' array directly to render the tabs  */}
        {categories.map((category) => (
          <button
            key={category.id}
            className={`task-tab-item ${category.id === activeTab ? "active" : ""}`}
            style={{
              backgroundColor: category.id === activeTab
                ? "var(--clr-table-tab-active)"
                : "var(--clr-table-tab)",
            }}
            onClick={() => handleTabClick(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <table className="task-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Comments</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((taskItem) => (
            <tr key={taskItem.id}>
              <td>
                {isEditing[taskItem.id] ? (
                  <input
                    type="text"
                    name="name"
                    value={
                      editedTasks[taskItem.id]?.name !== undefined
                        ? editedTasks[taskItem.id]?.name
                        : taskItem.name
                    }
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
                      editedTasks[taskItem.id]?.comments !== undefined
                        ? editedTasks[taskItem.id]?.comments
                        : taskItem.comments
                    }
                    onChange={(e) => handleInputChange(e, taskItem.id)}
                  />
                ) : (
                  taskItem.comments
                )}
              </td>
              <td
                className={
                  getDueDays(taskItem.dueDate, taskItem.isComplete).className
                }
              >
                <p>{getDueDays(taskItem.dueDate, taskItem.isComplete).text}</p>
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
                  formattedDueDate(taskItem.dueDate)
                )}
              </td>
              <td>
                {isEditing[taskItem.id] ? (
                  <div className="actionButtonsTableCell">
                    <button
                      className="iconButton"
                      onClick={() => handleUpdate(taskItem.id)}                      
                    >
                      <img src={editIcon} className="icon" alt="Update Icon" />
                      Update
                    </button>
                    <button
                      className="iconButton"
                      onClick={() => handleCancel(taskItem.id)}
                    >
                      <img
                        src={cancelIcon}
                        className="icon"
                        alt="Cancel Icon"
                      />
                      Cancel
                    </button>
                    <button
                      className="iconButton"
                      onClick={() => handleDelete(taskItem.id)}
                    >
                      <img
                        src={deleteIcon}
                        className="icon"
                        alt="Delete Icon"
                      />
                      Delete
                    </button>
                  </div>
                ) : (
                  <div className="actionButtonsTableCell">
                    <button
                      className="iconButton"
                      onClick={() => handleEdit(taskItem.id)}
                    >
                      <img src={editIcon} className="icon" alt="Edit Icon" />
                      Edit
                    </button>
                    <button
                      className="iconButton"
                      onClick={() => handleStatus(taskItem.id)}
                    >
                      <img
                        src={completeIcon}
                        className="icon"
                        alt="Complete Icon"
                      />
                      Done
                    </button>
                    <button
                      className="iconButton"
                      onClick={() => handleDelete(taskItem.id)}
                    >
                      <img
                        src={deleteIcon}
                        className="icon"
                        alt="Delete Icon"
                      />
                      Delete
                    </button>
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
