import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Project = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Failed to fetch projects', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Project List</h1>
      <ul>
        {projects.map(project => (
          <li key={project._id}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Project;