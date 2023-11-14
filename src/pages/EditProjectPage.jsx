import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "https://project-management-api-4641927fee65.herokuapp.com";

function EditProjectPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { projectId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    // GET /project/:projectId
    axios
      .get(`${API_URL}/projects/${projectId}`)
      .then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
      })
      .catch((error) => {
        console.log("Error getting project details from the API...");
        console.log(error);
      });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // prepare an object with the data that we send to the api
    const requestBody = {
      title: title,
      description: description,
    };

    // send PUT request
    axios
      .put(`${API_URL}/projects/${projectId}`, requestBody)
      .then((response) => {
        navigate(`/projects/${projectId}`);
      })
      .catch((error) => {
        console.log("Error updating project...");
        console.log(error);
      });
  };

  const deleteProject = () => {
    axios
      .delete(`${API_URL}/projects/${projectId}`)
      .then((response) => {
        navigate("/projects");
      })
      .catch((error) => {
        console.log("Error deleting project...");
        console.log(error);
      });
  };

  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>
        <label>
          Title
          <input
            type="text"
            name="title"
            placeholder="enter the title"
            required={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            placeholder="short description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <button type="submit">Update Project</button>
      </form>

      <button onClick={deleteProject}>Delete Project</button>
    </div>
  );
}

export default EditProjectPage;
