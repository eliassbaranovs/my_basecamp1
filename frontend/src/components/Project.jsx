import AddProject from "./AddProject";
import DeleteProject from "./DeleteProject";
import EditProject from "./EditProject";

const Project = ({name, description}) => {
  return (  
    <>
          <li key={name}>
            <h2>{name}</h2>
            <p>{description}</p>
          </li>
          <AddProject/>
         <EditProject />
          <DeleteProject />

    </>
  );
};

export default Project;