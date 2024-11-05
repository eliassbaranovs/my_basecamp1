const Project = ({name, description}) => {
  return (  
          <li key={name}>
            <h2>{name}</h2>
            <p>{description}</p>
          </li>
         
    
  
  );
};

export default Project;