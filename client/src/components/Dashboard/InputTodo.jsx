import React, { useState } from "react";
import axios from "axios";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();
    if (description.trim() === "") {
      window.alert("Please write something!");
    } else {
      try {
        const response = await axios.post(`https://pern-todo-app-xxh9.onrender.com/api/todos`, {
          description,
        });
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={addTodo} className="d-flex flex-column flex-md-row">
        <input
          type="text"
          className="form-control mb-2 mb-md-0 me-md-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
};

export default InputTodo;


