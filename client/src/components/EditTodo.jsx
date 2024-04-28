import React, { useState } from "react";
import axios from "axios";

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);

  const updateTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://pern-todo-app-xxh9.onrender.com/api/todos/${todo.todo_id}`,
        {
          description,
        }
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target={`#editModal${todo.todo_id}`}
      >
        <i className="bi bi-pencil-fill"></i>
      </button>

      <div
        className="modal fade"
        id={`editModal${todo.todo_id}`}
        tabIndex="-1"
        aria-labelledby={`editModalLabel${todo.todo_id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`editModalLabel${todo.todo_id}`}>
                Edit Todo
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={updateTodo}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTodo;
