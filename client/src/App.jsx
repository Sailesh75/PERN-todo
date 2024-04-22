import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";
import DeleteAllTodos from "./components/DeleteAllTodos";

const App = () => {
  return (
    <div className="container py-5 my-5 rounded shadow bg-light">
      <h1 className="text-center mb-4">Todo App</h1>
      <p className="text-center mb-4">
        Welcome to your personalized todo list application!
      </p>
      <InputTodo />
      <ListTodo />
      <DeleteAllTodos />
    </div>
  );
};

export default App;
