import  { useEffect, useState } from 'react';
import axios from 'axios';

const Project = ({name, description}) => {
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
          <li key={name}>
            <h2>{name}</h2>
            <p>{description}</p>
          </li>
         
    
  
  );
};

export default Project;