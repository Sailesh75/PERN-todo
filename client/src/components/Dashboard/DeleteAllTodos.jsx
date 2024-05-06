import React from "react";
import axios from "axios";

const DeleteAllTodos = () => {
  const deleteAllTodos = async () => {
    if (window.confirm("Are you sure you want to delete all todos?")) {
      try {
        const response = await axios.delete(`https://pern-todo-app-xxh9.onrender.com/api/todos`);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="d-flex justify-content-end">
      <button className="btn btn-danger mt-4" onClick={deleteAllTodos}>
        <i className="bi bi-trash-fill"></i> Delete All Todos
      </button>
    </div>
  );
};

export default DeleteAllTodos;



