import "./App.css";
import React from "react";
import { createGlobalStyle } from "styled-components";
import TodoCreate from "./components/TodoCreate";
import TodoHead from "./components/TodoHead";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";
import { TodoProvider } from "./context/TodoContext";

const GlobalStyle = createGlobalStyle`
  body {
    background: #BCF6FE;
    margin: 0;
    padding: 0;
    text-align: center;
  }
`;

function App() {
  return (
    <>
      <div className="App">
        <TodoProvider>
          <GlobalStyle />
          <TodoTemplate>
            <TodoHead />
            <TodoList />
            <TodoCreate />
          </TodoTemplate>
        </TodoProvider>
      </div>
    </>
  );
}

export default App;
