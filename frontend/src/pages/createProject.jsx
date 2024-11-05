import React, { useState } from 'react';
import Button from '../components/button';
import Input from '../components/input';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

const CreateProject = () => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectName, description }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create project');
      }

      const data = await response.json();
      console.log('Project created successfully:', data);

    } catch (err) {
      setError(err.message);
      console.error('Error creating project:', err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold text-center">Create New Project</h2>
          {error && <p className="text-center text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                inputPlaceholder="Project Name"
                inputType="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div>
              <Input
                inputPlaceholder="Description"
                inputType="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center mt-4">
              <Button buttonText="Create Project" />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateProject;
