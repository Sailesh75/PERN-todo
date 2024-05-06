import React, { useState, useEffect } from "react";
import InputTodo from "./InputTodo";
import ListTodo from "./ListTodo";
import DeleteAllTodos from "./DeleteAllTodos";
import axios from "axios";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  const getUserName = async () => {
    try {
      const response = await axios.get("http://localhost:5000/dashboard/", {
        headers: {
          token: localStorage.token,
        },
      });
      setName(response.data.username);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserName();
  },[]);

  return (
    <div className="container py-5 my-5 rounded shadow bg-light">
      <h1 className="text-center mb-4">Todo App</h1>
      <button onClick={handleLogout}>Log out</button>
      <p className="text-center mb-4">
        Welcome to your personalized todo list application!
      </p>
      <p>{name}</p>
      <InputTodo />
      <ListTodo />
      <DeleteAllTodos />
    </div>
  );
};

export default Dashboard;
