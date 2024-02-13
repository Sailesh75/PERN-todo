import React, { useState } from "react";
import axios from "axios";

const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);

  const updateTodo = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.put(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          description,
        }
      );
      window.location = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        type="button"
        class="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>

      <div
        class="modal"
        id={`id${todo.todo_id}`}
        onClick={() => setDescription(todo.description)}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit the todo</h4>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              ></button>
            </div>

            <div class="modal-body">
              <form>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
              </form>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-success"
                data-bs-dismiss="modal"
                onClick={(e) => updateTodo(e)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTodo;
