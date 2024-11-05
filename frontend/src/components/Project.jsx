/* eslint-disable react/prop-types */


const Project = ({name, description}) => {
  return (  
    <>
          <li key={name}>
            <h2 className="font-bold">Project name:{name}</h2>
            <p className="font-bold">Description: {description}</p>
          </li>
         

    </>
  );
};

export default Project;