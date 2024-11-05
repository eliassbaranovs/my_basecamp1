import React, { useState } from 'react';
import axios from 'axios';

const AddProject = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/projects', {
        name,
        description,
      });
      if (response.status === 201) {
        alert('Project created successfully');
        setName('');
        setDescription('');
      }
    } catch (error) {
      console.error('Failed to create project:', error);
      alert('Failed to create project');
    }
  };

  return (
    <div>
      <h2>Add Project</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-purple-700 "
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-pink-700 "
            />
          </label>
        </div>
        <button type="submit" className="bg-gray-700 " >Create Project</button>
      </form>
    </div>
  );
};

export default AddProject;