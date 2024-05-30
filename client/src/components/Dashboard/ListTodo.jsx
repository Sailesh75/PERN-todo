import React from "react";
import api from "../../api";
import EditTodo from "./EditTodo";
import "./_ListTodo.scss";
import { toast } from "react-toastify";

const ListTodo = ({ todos, setTodos }) => {
  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todo/todos/${id}`);
      setTodos(todos.filter((todo) => todo.uuid !== id));
      toast.success("Task deleted successfully!!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = async (event, todoUuid) => {
    const newIsCompleted = event.target.checked;
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.uuid === todoUuid ? { ...todo, isCompleted: newIsCompleted } : todo
      )
    );

    try {
      await api.put(`/todo/todos/check/${todoUuid}`, {
        isCompleted: newIsCompleted,
      });
    } catch (error) {
      console.error("Error updating todo status:", error);
      toast.warning("Error while adding task!!")
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
                  <EditTodo todo={todo} setTodos={setTodos}/>
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
