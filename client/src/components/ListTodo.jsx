import React, { useState, useEffect } from "react";
import axios from "axios";
import EditTodo from "./EditTodo";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodo();
  }, []);

  const getTodo = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/todos`);
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos(todos.filter((todos) => todos.todo_id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <table className="table m-5">
        <thead>
          <tr>
            <th>Todo list</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* need to map the data fetch via http req */}
          {todos.map((todos) => (
            <tr key={todos.todo_id}>
              <td>{todos.description}</td>
              <td>
                <EditTodo todo={todos} />
              </td>
              <td>
                <button
                  onClick={() => deleteTodo(todos.todo_id)}
                  className="btn btn-danger"
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListTodo;
