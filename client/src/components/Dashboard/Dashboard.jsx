import React, { useState, useEffect } from "react";
import InputTodo from "./InputTodo";
import ListTodo from "./ListTodo";
import DeleteAllTodos from "./DeleteAllTodos";
import api from "../../api";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [uuid, setUuid] = useState("");
  const [todos, setTodos] = useState([]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  const getUserName = async () => {
    try {
      const response = await api.get("/user/dashboard", {
        headers: {
          token: localStorage.token,
        },
      });
      setName(response.data.username);
      setUuid(response.data.uuid);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTodos = async (userUuid) => {
    try {
      const response = await api.get(`/todo/todos/${userUuid}`);
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserName();
  }, []);

  useEffect(() => {
    if (uuid) {
      fetchTodos(uuid);
    }
  }, [uuid]);

  return (
    <div className="container py-5 my-5 rounded shadow bg-light">
      <div className="dashboard-header-top d-flex justify-content-between align-items-center mb-4">
        <p className="welcome-text mb-0">
          Welcome, <span className="username">{name}</span>
        </p>
        <button className="btn btn-dark" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right logout-icon"></i>
          <span className="logout-text"> Logout</span>
        </button>
      </div>
      <h3 className="text-center mb-4">Task Overview</h3>
      <InputTodo uuid={uuid} todos={todos} setTodos={setTodos}  />
      <ListTodo todos={todos} setTodos={setTodos} />
      <DeleteAllTodos todos={todos} setTodos={setTodos}/>
    </div>
  );
};

export default Dashboard;
