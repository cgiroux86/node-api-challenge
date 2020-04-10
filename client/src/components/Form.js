import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const Form = (props) => {
  const { register, handleSubmit, watch, errors, reset } = useForm();
  console.log(register);
  const onSubmit = (data) => {
    console.log(data);
    axios.post("http://localhost:4500/api/projects", data).then((res) => {
      axios
        .get("http://localhost:4500/api/projects")
        .then((res) => props.setProjects(res.data));
      reset();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <input
        name="name"
        defaultValue=""
        ref={register({ required: true })}
      ></input>
      <label>Description</label>
      <input
        name="description"
        defaultValue=""
        ref={register({ required: true })}
      ></input>
      <button type="submit">Add New Project</button>
    </form>
  );
};

export default Form;
