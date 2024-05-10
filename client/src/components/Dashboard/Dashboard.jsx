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
      const response = await axios.get("https://todoapp-bnx4.onrender.com/dashboard/", {
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
  }, []);

  return (
    <div className="container py-5 my-5 rounded shadow bg-light">
      <div className="dashboard-header">
        <div></div>
        <h1 className="text-center mb-4">Todo App</h1>
        <button className="btn btn-dark" onClick={handleLogout} >
          Log out
        </button>
      </div>
      <p className="text-center mb-4">
        Welcome{" "}
        <span>
          <strong>{name}</strong>
        </span>{" "}
        to your todo app!!
      </p>
      <InputTodo />
      <ListTodo />
      <DeleteAllTodos />
    </div>
  );
};

export default Dashboard;
