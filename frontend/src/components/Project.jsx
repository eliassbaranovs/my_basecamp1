/* eslint-disable react/prop-types */

const Project = ({ name, description }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Project name: {name}
      </h2>
      <p className="text-gray-600">Description: {description}</p>
    </div>
  );
};

export default Project;
