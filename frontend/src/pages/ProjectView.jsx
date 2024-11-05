import { useState, useEffect } from "react";
import Project from "../components/Project";
import AddProject from "../components/AddProject";
import DeleteProject from "../components/DeleteProject";
import EditProject from "../components/EditProject";

const ProjectView = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/projects", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch projects");

        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      <div className="flex gap-20">
        <AddProject />
      </div>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <Project name={project.name} description={project.description} />
            <DeleteProject projectId={project._id} />
            <EditProject
              projectId={project._id}
              initialName={project.name}
              initialDescription={project.description}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectView;
