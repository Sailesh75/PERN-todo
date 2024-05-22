import React, { useState, useEffect } from "react";
import InputTodo from "./InputTodo";
import ListTodo from "./ListTodo";
import DeleteAllTodos from "./DeleteAllTodos";
import api from "../../api";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  const getUserName = async () => {
    try {
      const response = await api
      .get("/dashboard/", {
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
        <h1 className="text-center mb-4">Task Overview</h1>
        <button className="btn btn-dark" onClick={handleLogout}>
          Log out
        </button>
      </div>
      <p className="text-center mb-4">
        Hello{" "}
        <span>
          <strong>{name}</strong>
        </span>
        , get started with your ToDo list!
      </p>
      <InputTodo />
      <ListTodo />
      <DeleteAllTodos />
    </div>
  );
};

export default Dashboard;
