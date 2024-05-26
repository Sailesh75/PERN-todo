import React, { useState } from "react";
import api from "../../api";
import EditTodo from "./EditTodo";
import "./_ListTodo.scss";

const ListTodo = ({ todos, setTodos }) => {
  const [loading, setLoading] = useState({});

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo.uuid !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = async (event, todoUuid) => {
    const newIsCompleted = event.target.checked;
    setLoading((prev) => ({ ...prev, [todoUuid]: true }));

    try {
      await api.put(`/api/todos/check/${todoUuid}`, {
        isCompleted: newIsCompleted,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.uuid === todoUuid
            ? { ...todo, isCompleted: newIsCompleted }
            : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo status:", error);
    } finally {
      setLoading((prev) => ({ ...prev, [todoUuid]: false }));
    }
  };

  return (
    <div className="table-responsive">
      <table className="table list-todo-table">
        <thead>
          <tr>
            <th className="list-todo-status"></th>
            <th className="list-todo-todo">Todo</th>
            <th className="list-todo-edit">Edit</th>
            <th className="list-todo-delete">Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => {
            return (
              <tr key={todo.uuid}>
                <td className="list-todo-status">
                  {loading[todo.uuid] ? (
                    <div
                      className="spinner-border spinner-border-sm text-primary"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <input
                      type="checkbox"
                      className="list-todo-checkbox"
                      checked={todo.isCompleted}
                      onChange={(e) => handleCheckboxChange(e, todo.uuid)}
                    />
                  )}
                </td>
                <td className="list-todo-todo">{todo.description}</td>
                <td className="list-todo-edit">
                  <EditTodo todo={todo} />
                </td>
                <td className="list-todo-delete">
                  <button
                    onClick={() => deleteTodo(todo.uuid)}
                    className="btn btn-danger"
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListTodo;
