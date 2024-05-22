import React, { useState, useEffect } from "react";
import api from "../../api";
import EditTodo from "./EditTodo";
import "./_ListTodo.scss";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  const [uuid, setUuid] = useState("");

  useEffect(() => {
    const getUserUuid = async () => {
      try {
        const response = await api.get(
          "/dashboard/",
          {
            headers: {
              token: localStorage.token,
            },
          }
        );
        setUuid(response.data.uuid);
      } catch (error) {
        console.error(error);
      }
    };

    getUserUuid();
  }, []);

  useEffect(() => {
    if (uuid) {
      const fetchTodos = async () => {
        try {
          const response = await api.get(
            `/api/todos/${uuid}`
          );
          setTodos(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchTodos();
    }
  }, [uuid]);

  const deleteTodo = async (id) => {
    try {
      console.log(id);
      await api.delete(`/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo.uuid !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = async (event, todoUuid) => {
    const newIsCompleted = event.target.checked;

    try {
      await api.put(
        `/api/todos/check/${todoUuid}`,
        {
          isCompleted: newIsCompleted,
        }
      );
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.uuid === todoUuid
            ? { ...todo, isCompleted: newIsCompleted }
            : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo status:", error);
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
                  <input
                    type="checkbox"
                    className="list-todo-checkbox"
                    checked={todo.isCompleted}
                    onChange={(e) => handleCheckboxChange(e, todo.uuid)}
                  />
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
