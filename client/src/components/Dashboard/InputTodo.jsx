import React, { useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";

const InputTodo = ({ uuid, setTodos, todos }) => {
  const [description, setDescription] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();
    if (description.trim() === "") {
      toast.warning("Please write something!");
    } else {
      try {
        const response = await api.post(`/api/todos`, {
          description,
          useruuid: uuid,
        });
        setTodos([...todos, response.data]);
        setDescription("");
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
