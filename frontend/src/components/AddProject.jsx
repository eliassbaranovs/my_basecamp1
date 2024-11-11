import { useState } from "react";
import axios from "axios";

const AddProject = ({ onProjectAdded }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/projects",
        {
          name,
          description,
        },
        {
          withCredentials: true, // Include credentials (cookies) in the request
        }
      );
      if (response.status === 201) {
        alert("Project created successfully");
        setName("");
        setDescription("");
        onProjectAdded(); // Call the refresh callback
      }
    } catch (error) {
      console.error("Failed to create project:", error);
      alert("Failed to create project");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Project</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreate();
        }}
      >
        <div className="mb-4">
          <label className="block text-gray-700">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
            />
          </label>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default AddProject;
