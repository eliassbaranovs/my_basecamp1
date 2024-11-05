/* eslint-disable react/prop-types */
import  { useState } from "react";
import axios from "axios";

const EditProject = ({ projectId, initialName, initialDescription }) => {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);

  const handleEdit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/projects/${projectId}`,
        {
          name,
          description,
        },
        {
          withCredentials: true, // Include credentials (cookies) in the request
        }
      );
      if (response.status === 200) {
        alert("Project updated successfully");
      }
    } catch (error) {
      console.error("Failed to update project:", error);
      alert("Failed to update project");
    }
  };

  return (
    <div>
      <h2>Edit Project</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEdit();
        }}
      >
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-green-700 "
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-orange-700 "
            />
          </label>
        </div>
        <button type="submit" className="bg-red-700 ">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProject;
