import React, { useCallback } from "react";
import folderWhite from "../assets/folder-white.svg";
import TaskTile from "./TaskTile";

export default function TaskList({
  tasks,
  setActiveTask,
  fetchAllTasks,
  showCreateTaskScreen,
  showViewTaskScreen,
  showEditTaskScreen,
}) {
  const viewTask = useCallback(
    (task) => {
      setActiveTask(task);
      showViewTaskScreen();
    },
    [setActiveTask, showEditTaskScreen]
  );
  return (
    <div className="task-list-screen content-section">
      <div className="content-section-container">
        <div className="task-list-header-main">
          <p className="task-heading">📋 Task</p>
          <button
            className="add-task-btn cursor-pointer"
            onClick={showCreateTaskScreen}
          >
            <img src={folderWhite} alt="add task icon" />
            Add New Task
          </button>
        </div>

        {/* Task List */}
        <div className="task-list-container">
          {tasks.map((task) => (
            <TaskTile
              key={task._id + "-task-tile"}
              task={task}
              onClick={() => viewTask(task)}
              fetchAllTasks={fetchAllTasks}
              setActiveTask={setActiveTask}
              showEditTaskScreen={showEditTaskScreen}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
