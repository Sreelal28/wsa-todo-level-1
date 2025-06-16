import Task from "../models/taskModel.js";
const newTask = async (req, res) => {
  try {
    //extract data from the body
    const { title, description, due_date } = req.body;
    //validation on the incoming data
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and Description NOT FOUND" });
    }
    //create document based on the schema
    const newTask = await Task.create({ title, description, due_date });

    //success response
    res.status(201).json({
      success: true,
      message: "Task Created Succcessfully",
      task: newTask,
    });
  } catch (error) {
    console.log(error.message);

    res.status(400).json({
      success: false,
      message: "Failed to create TASK",
    });
  }
};

const getTasks = async (req, res) => {
  //get all task from mongodb
  try {
    const tasks = await Task.find({});
    res.status(200).json({
      success: true,
      tasks,
      message: "fetched all task successfully",
    });
  } catch (error) {
    console.log("Failed to fetch task", message);

    res.status(400).json({
      success: false,
      message: "Failed to get TASK",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    //get the id from params
    const { id } = req.params;
    //get the data to update, from body
    const { title, description, due_date } = req.body;
    //validation on body and id
    if (!id) {
      return res.status(400).json({ message: "Task id required" });
    }
    //find the data according to the id
    // const task = await Task.findById(id);
    //update the document
    // if (title) task.title = title;
    // if (description) task.description = description;
    // if (due_date) task.due_date = due_date;
    // if (!due_date) task.due_date = null;
    // //save
    // const updatedTask = await task.save();
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, due_date: due_date || null },
      { returnDocument: "after" }
    );

    //send a response
    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.log("Failed to update task", error.message);

    res.status(400).json({
      success: false,
      message: "Failed to update task",
    });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Task id required" });
    }
    const deletedTask = await Task.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Task deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete task",
    });
  }
};
export { newTask, getTasks, updateTask, deleteTask };
