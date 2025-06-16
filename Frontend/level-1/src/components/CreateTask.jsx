import React, { useCallback, useState } from "react";
import UserIcon from "../assets/user-icon.png";
import TitleImg from "../assets/title-placeholder-img.svg";
import Memo from "../assets/memo.svg";
import Calendar from "../assets/timetable_10760786.png";
import createTaskAPI from "./api/CreateTask";
import clsx from "clsx";
import InputField from "./ui/InputField";
export default function CreateTask({ fetchAllTasks, showTaskListScreen }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState();
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

  const CreateNewTask = useCallback(
    (values) => {
      createTaskAPI(values, handleResponse, handleError, setLoading);
    },
    [handleError, handleResponse]
  );
  const handleAddTask = useCallback(() => {
    const values = { taskTitle, taskDescription, taskDueDate };
    const isValid = values;

    if (isValid) CreateNewTask(values);
  }, [CreateNewTask, taskDescription, taskTitle, taskDueDate, validate]);
  return (
    <div className="content-section create-task-section">
      <div className="create-task-card">
        <img src={UserIcon} width={263} alt="" />
        <h1 className="create-task-title-text">Create New Task</h1>
        <InputField
          name={"new-task-card"}
          value={taskTitle}
          onChange={handleTitleChange}
          label={"Title"}
          type={"text"}
          inputImg={TitleImg}
          placeholder={"Title"}
        />
        <InputField
          name={"new-task-card"}
          value={taskDescription}
          onChange={handleDescriptionChange}
          label={"Description"}
          type={"textarea"}
          inputImg={Memo}
          placeholder={"Description"}
          className={"input-margin"}
        />
        <InputField
          name={"new-task-due-date"}
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
              "add-task-btn",
              loading ? "disabled-add-task-btn" : "cursor-pointer"
            )}
            disabled={loading}
            onClick={handleAddTask}
          >
            {loading ? "Adding Task" : "Add Task"}{" "}
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
