import axios from "axios";

const DeleteProject = ({ projectId }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/projects/${projectId}`,
        {
          withCredentials: true, // Include credentials (cookies) in the request
        }
      );
      if (response.status === 200) {
        alert("Project deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
      alert("Failed to delete project");
    }
  };

  return (
    <button className="bg-blue-700 " onClick={handleDelete}>
      Delete Project
    </button>
  );
};

export default DeleteProject;
