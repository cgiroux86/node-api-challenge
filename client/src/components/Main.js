import React, { useState, useEffect } from "react";
import Axios from "axios";
import Project from "./Project";
import Form from "./Form";

const Main = () => {
  const [projects, setProjects] = useState([]);
  console.log(projects);

  useEffect(() => {
    Axios.get("http://localhost:4500/api/projects")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Form setProjects={setProjects} />
      {projects.length > 0 &&
        projects.map((project) => {
          return (
            <Project
              Setprojects={setProjects}
              key={project.id}
              id={project.id}
              name={project.name}
              description={project.description}
            />
          );
        })}
    </div>
  );
};

export default Main;
