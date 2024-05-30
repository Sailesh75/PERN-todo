import React, { useState } from "react";
import api from "../../api";
import Modal from "./Modal/Modal";
import { toast } from "react-toastify";

const EditTodo = ({ todo, setTodos }) => {
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState(todo.description);

  const updateTodo = async (e) => {
    e.preventDefault();
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.uuid === todo.uuid ? { ...t, description } : t))
    );
    setShowModal(false);
    toast.success("Task updated successfully!!");
    try {
      await api.put(`/todo/todos/${todo.uuid}`, {
        description,
      });
    } catch (error) {
      console.error(error);
      toast.error("Error updating task");
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => setShowModal(true)}
      >
        <i className="bi bi-pencil-fill"></i>
      </button>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className="modal-header">
          <h5 className="modal-title">Edit Todo</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowModal(false)}
          ></button>
        </div>
        <div className="modal-body">
          <form onSubmit={updateTodo}>
            <input
              type="text"
              className="form-control mb-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default EditTodo;
