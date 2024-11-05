import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const ProjectDetails = () => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectName, description, startDate, endDate }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save project details');
      }

      const data = await response.json();
      console.log('Project saved successfully:', data);

    } catch (err) {
      setError(err.message);
      console.error('Error saving project:', err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Project Details</h2>
          {error && <p className="text-center text-red-500">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="w-full mt-4">
              <Input
                inputPlaceholder="Project Name"
                inputType="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="w-full mt-4">
              <Input
                inputPlaceholder="Description"
                inputType="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="w-full mt-4">
              <Input
                inputPlaceholder="Start Date"
                inputType="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="w-full mt-4">
              <Input
                inputPlaceholder="End Date"
                inputType="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center mt-4">
              <Button buttonText="Save Project" />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProjectDetails;
