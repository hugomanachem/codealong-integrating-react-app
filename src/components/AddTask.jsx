import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "https://project-management-api-4641927fee65.herokuapp.com";

function AddTask(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = parseInt(props.projectId);

    const requestBody = {
      title: title,
      description: description,
      projectId: id,
    };

    // POST /tasks
    axios
      .post(`${API_URL}/tasks`, requestBody)
      .then((response) => {
        props.callbackToUpdateProject();
      })
      .catch((error) => {
        console.log("Error creating a new task...");
        console.log(error);
      });
  };

  return (
    <div className="AddTask">
      <h3>Add New Task</h3>

      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            name="title"
            required={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Description
          <textarea
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;
