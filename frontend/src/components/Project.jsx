/* eslint-disable react/prop-types */

const Project = ({ name, description }) => {
  return (
    <>
      <li
        key={name}
        className="p-4 border-b border-gray-200"
      >
        <h2 className="text-xl font-bold text-gray-800">
          Project name: {name}
        </h2>
        <p className="text-gray-600">Description: {description}</p>
      </li>
    </>
  );
};

export default Project;
