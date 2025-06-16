async function updateTaskAPI(
  values,
  handleResponse,
  handleError,
  setLoading,
  taskId
) {
  setLoading(true);
  try {
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    const endpoint = `/task/${taskId}`;
    const url = `${baseUrl}${endpoint}`;
    const requestBody = JSON.stringify({
      title: values.taskTitle,
      description: values.taskDescription,
      due_date: values.taskDueDate?.toISOString(),
    });
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: requestBody,
    });
    const jsonData = await response.json();
    if (!response.ok) {
      const errorMessage = jsonData.message || "Unknown Error Occured";
      throw new Error(errorMessage);
    }
    handleResponse(jsonData);
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Unknown Error";
    handleError(new Error(errorMessage));
  } finally {
    setLoading(false);
  }
}
export default updateTaskAPI;
