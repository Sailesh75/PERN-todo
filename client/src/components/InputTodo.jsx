import React, { useState } from "react";
import axios from "axios";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      if (description === "") {
        window.alert("Write SM please!!");
      } else {
        const response = await axios.post(`http://localhost:5000/todos`, {
          description,
        });
        // once request has been sent it refreshes the window showing the change
        window.location = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:5000/todos`);
      console.log(response);
      window.location = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="m-4 text-center">Welcome to PERN todo app</h1>
      <form className="d-flex p-2">
        <input
          type="text"
          className="form-control m-5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button className="btn btn-primary m-5" onClick={addTodo}>
          Add
        </button>
        <button className="btn btn-danger m-5" onClick={deleteAllTodo}>
          Delete all
        </button>
      </form>
    </>
  );
};

export default InputTodo;
