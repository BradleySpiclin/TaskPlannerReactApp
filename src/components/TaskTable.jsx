import React, { useState, useEffect } from "react";
import { updateTask } from "../services/api";
import { deleteTask } from "../services/api";
import { fetchTaskById } from "../services/api";
import "../styles/tasktable.css";

const TaskTable = ({ taskItems, setTaskItems }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [editedTasks, setEditedTasks] = useState({});
  const [isEditing, setIsEditing] = useState({});

  useEffect(() => {
    // effect will only be triggered when 'activeTab' is initially 'null'
    // and not on subsequent 'taskItems' changes
    if (taskItems.length > 0 && activeTab === null) {
      setActiveTab(taskItems[0].unitCode);
    }
  }, [taskItems, activeTab]);

  const handleTabClick = (unitCode) => {
    setActiveTab(unitCode);
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

  const getDueDays = (dueDate, completed) => {
    if (completed) {
      return "Completed";
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
      return "Due today";
    } else if (daysDiff < 0) {
      const absDaysDiff = Math.abs(daysDiff);
      const days = absDaysDiff > 1 ? "days" : "day";
      return `Overdue by ${absDaysDiff} ${days}`;
    } else {
      const days = daysDiff > 1 ? "days" : "day";
      return `Due in ${daysDiff} ${days}`;
    }
  };

  // const handleUpdateTask = (updatedTask) => {
  //   setTaskItems((prevTaskItems) => {
  //     return prevTaskItems.map((taskItem) => {
  //       if (taskItem.id === updatedTask.id) {
  //         return updatedTask; // Replace the matching task with the updated task
  //       }
  //       return taskItem; // Return the unchanged task item
  //     });
  //   });

  //   setEditedTasks((prevEditedTasks) => ({
  //     ...prevEditedTasks,
  //     [updatedTask.id]: {
  //       ...prevEditedTasks[updatedTask.id],
  //       ...updatedTask,
  //     },
  //   }));
  // };

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
      unitCode: editedTask.unitCode,
      name: editedTask.name,
      comments: editedTask.comments,
      dueDate: editedTask.dueDate,
      isComplete: editedTask.isComplete,
    };

    console.log("Updated Task:", updatedTask);

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

        fetchTaskById(taskId)
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
    ? taskItems.filter((taskItem) => taskItem.unitCode === activeTab)
    : taskItems;

  // Temporary tab colours 
  const colours = [
    '#6469DB', 
    '#DB6464', 
    '#64A1DB', 
    '#DB64DB', 
    '#DB8D64',
  ];

  return (
    <div>
      <h1>Task Items</h1>
      <div className="task-tab">
        {Array.from(
          new Set(taskItems.map((taskItem) => taskItem.unitCode))
        ).map((unitCode, index) => (
          <button
            key={unitCode}
            className={`task-tab-item ${unitCode === activeTab ? "active" : ""}`}
            // Set the colour of the tabs 
            style={{ backgroundColor: colours[index % 5] }}
            onClick={() => handleTabClick(unitCode)}
          >
            {unitCode}
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
                    value={editedTasks[taskItem.id]?.name !== undefined ? editedTasks[taskItem.id]?.name : taskItem.name}
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
                    value={editedTasks[taskItem.id]?.comments !== undefined ? editedTasks[taskItem.id]?.comments : taskItem.comments}
                    onChange={(e) => handleInputChange(e, taskItem.id)}
                  />
                ) : (
                  taskItem.comments
                )}
              </td>
              <td>
                <p>{getDueDays(taskItem.dueDate, taskItem.isComplete)}</p>
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
                  <>
                    <button onClick={() => handleUpdate(taskItem.id)}>
                      Update
                    </button>
                    <button onClick={() => handleCancel(taskItem.id)}>
                      Cancel
                    </button>
                    <button onClick={() => handleDelete(taskItem.id)}>
                      Delete
                    </button>
                  </>
                ) : (
                  <div>
                    <button onClick={() => handleEdit(taskItem.id)}>
                      Edit
                    </button>
                    <button onClick={() => handleStatus(taskItem.id)}>
                      Complete
                    </button>
                    <button onClick={() => handleDelete(taskItem.id)}>
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
