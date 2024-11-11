/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

const EditProject = ({
  projectId,
  initialName,
  initialDescription,
  onProjectEdited,
}) => {
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
        onProjectEdited(); // Call the refresh callback
      }
    } catch (error) {
      console.error("Failed to update project:", error);
      alert("Failed to update project");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEdit();
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
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProject;
