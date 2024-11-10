import { useState, useEffect } from "react";
import Project from "../components/Project";
import AddProject from "../components/AddProject";
import DeleteProject from "../components/DeleteProject";
import EditProject from "../components/EditProject";
import Navbar from "../components/Navbar";

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
    <>
      <Navbar />
      <section className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-4 text-white">Projects</h1>
          <div className="bg-blue-100 p-4 rounded-lg shadow-md mb-4">
            <AddProject />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <Project
                  name={project.name}
                  description={project.description}
                />
                <DeleteProject projectId={project._id} />
                <EditProject
                  projectId={project._id}
                  initialName={project.name}
                  initialDescription={project.description}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectView;
