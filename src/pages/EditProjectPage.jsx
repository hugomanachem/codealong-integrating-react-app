import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";


const API_URL = "https://project-management-api-4641927fee65.herokuapp.com";

function EditProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const { projectId } = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/projects/${projectId}`)
      .then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
      })
      .catch((error) =>
        console.log(
          "error while getting infos from the project to update : ",
          error
        )
      );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, description };

    axios
      .put(`${API_URL}/projects/${projectId}`, requestBody)
      .then((response) => {
        console.log("Project updated!")
        navigate(`/projects/${projectId}`);
      })
      .catch((error) =>
        console.log("error during update of the project : ", error)
      );
  };

  return (
    <div className="CreateProjectPage">
      <h3>Edit the Project</h3>

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

        <button>Update Project</button>
      </form>
      <Link to={`/projects/${projectId}`}>
        <button>Back to project</button>
      </Link>
    </div>
  );
}

export default EditProjectPage;
