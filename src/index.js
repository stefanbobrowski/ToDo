import React from "react";
import ReactDOM from "react-dom";
import ToDo from "./ToDo";
import "./styles.scss";

const App = () => {
  return (
    <div id="App">
      <ToDo></ToDo>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
