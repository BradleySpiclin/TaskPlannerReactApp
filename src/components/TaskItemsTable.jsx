import React from "react";

function TaskItemsTable({ taskItems }) {
  // Group task items by unitCode
  const groupedTaskItems = taskItems.reduce((grouped, taskItem) => {
    if (!grouped[taskItem.unitCode]) {
      grouped[taskItem.unitCode] = [];
    }
    grouped[taskItem.unitCode].push(taskItem);
    return grouped;
  }, {});

  return (
    <div>
      <h1>Task Items</h1>
      {Object.keys(groupedTaskItems).map((unitCode) => (
        <div key={unitCode}>
          <h2>Unit Code: {unitCode}</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Comments</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {groupedTaskItems[unitCode].map((taskItem) => (
                <tr key={taskItem.id}>
                  <td>{taskItem.name}</td>
                  <td>{taskItem.comments}</td>
                  <td>{taskItem.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default TaskItemsTable;