import React, { useCallback, useState } from "react";
import EditTaskImg from "../assets/edit-task-logo.svg";
import InputField from "./ui/InputField";
import Calendar from "../assets/timetable_10760786.png";
import TitleImg from "../assets/title-placeholder-img.svg";
import clsx from "clsx";
import updateTaskAPI from "./api/UpdateTask.js";
import Memo from "../assets/memo.svg";
export default function EditTask({ showTaskListScreen, task, fetchAllTasks }) {
  const [taskTitle, setTaskTitle] = useState(task.title ?? "");
  const [taskDescription, setTaskDescription] = useState(
    task.description ?? ""
  );
  const [taskDueDate, setTaskDueDate] = useState(
    task.due_date ? new Date(task.due_date) : undefined
  );
  const [loading, setLoading] = useState(false);
  const handleTitleChange = useCallback((e) => {
    setTaskTitle(e.target.value);
  }, []);
  const handleDescriptionChange = useCallback((e) => {
    setTaskDescription(e.target.value);
  }, []);
  const handleDateChange = useCallback((date) => {
    setTaskDueDate(date);
  }, []);
  const validate = useCallback((values) => {
    const { taskTitle, taskDescription } = values;
    if (taskTitle && taskDescription) {
      return true;
    } else {
      const errorMsg = "Please fill out the title and description";
      return false;
    }
  }, []);
  const handleResponse = useCallback(
    function (responseData) {
      if (responseData.success) {
        console.log("handled Successfully");
        fetchAllTasks();
      }
    },
    [fetchAllTasks]
  );
  const handleError = useCallback(function (errorMsg) {
    alert(errorMsg);
    console.log(errorMsg);
  }, []);

  const editTask = useCallback(
    (values, taskId) => {
      updateTaskAPI(values, handleResponse, handleError, setLoading, taskId);
    },
    [handleResponse, handleResponse]
  );
  const handleEditTask = useCallback(() => {
    const values = {
      taskTitle,
      taskDescription,
      taskDueDate,
    };
    const isValid = validate(values);
    if (isValid) editTask(values, task._id);
  }, [taskTitle, taskDescription, taskDueDate, validate, editTask, task._id]);
  return (
    <div className="create-task-section">
      <div className="create-task-card">
        <img src={EditTaskImg} alt="edit Task" width={263} />
        <h1 className="create-task-title-text">Edit Task</h1>

        {/* custom Input Field for title */}
        <InputField
          name="edit-task-title"
          value={taskTitle}
          onChange={handleTitleChange}
          label={"Title"}
          type={"text"}
          inputImg={TitleImg}
          placeholder="Title"
        />
        {/* custom Input Field for description */}
        <InputField
          name="edit-task-description"
          value={taskDescription}
          onChange={handleDescriptionChange}
          label={"Description"}
          type={"textarea"}
          inputImg={Memo}
          placeholder={"Description"}
          className={"input-margin"}
        />

        {/* custom Input Field for due date */}
        <InputField
          name="edit-task-due-date"
          value={taskDueDate}
          onChange={handleDateChange}
          label={"Due Date"}
          type={"date"}
          inputImg={Calendar}
          placeholder={"Due Date"}
          className={"input-margin"}
        />

        <div className="add-edit-task-btns">
          <button
            className={clsx(
              "btn",
              "edit-task-btn",
              loading ? "disabled-delete-btn" : "cursor-pointer"
            )}
            disabled={loading}
            onClick={handleEditTask}
          >
            {loading ? "Saving" : "Save"}
          </button>
          <button
            className="btn cancel-btn cursor-pointer"
            onClick={showTaskListScreen}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
