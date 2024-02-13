import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

//components
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";

const App = () => {
  return (
    <>
      <InputTodo/>
      <ListTodo/>
    </>
  );
};

export default App;
