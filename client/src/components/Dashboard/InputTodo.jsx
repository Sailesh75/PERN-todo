import React, { useState, useEffect } from "react";
import api from "../../api";
import { toast } from "react-toastify";

const InputTodo = () => {
  const [description, setDescription] = useState("");
  const [uuid, setUuid] = useState("");

  const getUSerUuid = async () => {
    try {
      const response = await api.get("/dashboard/", {
        headers: {
          token: localStorage.token,
        },
      });
      setUuid(response.data.uuid);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (description.trim() === "") {
      toast.warning("Please write something!");
    } else {
      try {
        await api.post(`/api/todos`, {
          description: description,
          useruuid: uuid,
        });
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getUSerUuid();
  }, []);

  return (
    <div className="mb-4">
      <form onSubmit={addTodo} className="d-flex flex-column flex-md-row">
        <input
          type="text"
          className="form-control mb-2 mb-md-0 me-md-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
};

export default InputTodo;
