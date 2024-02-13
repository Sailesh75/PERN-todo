import React, { useState } from "react";
import axios from "axios";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/todos`, {
        description,
      });
      // once request has been sent it refreshes the window showing the change
      window.location = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="m-4 text-center">Welcome to PERN todo app</h1>
      <form className="d-flex p-2" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button className="btn btn-primary">Add</button>
      </form>
    </>
  );
};

export default InputTodo;
