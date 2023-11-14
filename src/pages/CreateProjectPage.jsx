import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "https://project-management-api-4641927fee65.herokuapp.com";

function CreateProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, description };

    axios
      .post(API_URL + "/projects", requestBody)
      .then((response) => {
        navigate("/projects");
      })
      .catch((error) =>
        console.log("error during creation of the project : ", error)
      );
  };

  return (
    <div className="CreateProjectPage">
      <h3>Add Project</h3>

      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            name="title"
            value={title}
            placeholder="enter the title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
        </label>

        <label>
          Description
          <input
            type="text"
            name="description"
            value={description}
            placeholder="enter the title"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </label>

        <button>Create Project</button>
      </form>
      <Link to="/projects">
        <button>Back to projects</button>
      </Link>
    </div>
  );
}
export default CreateProjectPage;
