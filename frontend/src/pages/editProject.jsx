import React, { useState, useEffect } from 'react';
import Button from '../components/button';
import Input from '../components/input';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

const EditProject = ({ projectId }) => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/projects/${projectId}`);
        if (!response.ok) throw new Error('Failed to fetch project details');
        
        const data = await response.json();
        setProjectName(data.projectName);
        setDescription(data.description);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectName, description }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save project');
      }

      const data = await response.json();
      console.log('Project updated successfully:', data);

    } catch (err) {
      setError(err.message);
      console.error('Error updating project:', err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-6 text-center">Edit Project</h1>
          {error && <p className="text-center text-red-500">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                inputPlaceholder="Project Name"
                inputType="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Input
                inputPlaceholder="Description"
                inputType="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center mt-4">
              <Button buttonText="Save" />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditProject;
