import React, { useState, useEffect } from "react";
import axios from "axios";
import EditTodo from "./EditTodo";
import "./_ListTodo.scss";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `https://pern-todo-app-xxh9.onrender.com/api/todos`
      );
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(
        `https://pern-todo-app-xxh9.onrender.com/api/todos/${id}`
      );
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = async (event, todoId) => {
    const isCompleted = event.target.checked;

    try {
      // Send an HTTP PUT request to the backend to update the `completed` status of the todo
      await axios.put(
        `https://pern-todo-app-xxh9.onrender.com/api/todos/${todoId}`,
        { completed: isCompleted }
      );

      // Update the state of the todos list to reflect the change
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.todo_id === todoId ? { ...todo, completed: isCompleted } : todo
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
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td className="list-todo-status">
                <input
                  type="checkbox"
                  className="list-todo-checkbox"
                  checked={todo.completed}
                  onChange={(e) => handleCheckboxChange(e, todo.todo_id)}
                />
              </td>
              <td className="list-todo-todo">{todo.description}</td>
              <td className="list-todo-edit">
                <EditTodo todo={todo} />
              </td>
              <td className="list-todo-delete">
                <button
                  onClick={() => deleteTodo(todo.todo_id)}
                  className="btn btn-danger"
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTodo;
