import React, { useState } from "react";
import Axios from "axios";

const Project = (props) => {
  const [actions, setActions] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [actionToggle, setActionToggle] = useState(false);
  const [add, setAdd] = useState({
    description: "",
    notes: "",
  });

  const handleChange = (e) => {
    setAdd({ ...add, [e.target.name]: e.target.value });
  };

  const handleSubmit = (id) => {
    Axios.get(`http://localhost:4500/api/projects/${id}/actions`)
      .then((res) => {
        setActions(res.data);
      })
      .catch((err) => console.log(err));

    const addAction = (e) => {
      e.preventDefault();
      Axios.post("http://localhost:4500/api/actions");
    };
  };
  return (
    <div>
      <p>{props.name}</p>
      <p>{props.description}</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleSubmit(props.id);
          setActionToggle(!actionToggle);
        }}
      >
        See Project Actions
      </button>
      <button onClick={() => setToggle(!toggle)}>Add Action</button>
      <form className={toggle ? "" : "form"}>
        {/* <label>project_id</label>
        <input onChange={handleChange} name="project_id"></input> */}
        <label>description</label>
        <input onChange={handleChange} name="description"></input>
        <label>notes</label>
        <input name="notes"></input>
        <button>Add Action</button>
      </form>
      <div>
        {actions.length > 0 &&
          actionToggle &&
          actions.map((action) => (
            <div key={action.id}>
              <p>{action.notes}</p>
              <p>{action.id}</p>
            </div>
          ))}{" "}
      </div>
    </div>
  );
};

export default Project;
