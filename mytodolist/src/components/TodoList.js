import React from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import { useTodoState } from "../context/TodoContext";

const TodoListBlock = styled.div`
  flex: 1;
  margin: 10px auto;

  overflow-y: auto;
  /* TodoCreate 랑 겹치지 않게 하기 위해 설정 */
  padding-bottom: 48px;

  /* padding: 10px 10px; */
  /* width: 307px;
  height: 250px; */

  /* background: gray; */ // 면적 비교하기 위해 설정
  /* justify-content: center; */
  /* align-content: center; */
`;

function TodoList() {
  const todos = useTodoState();

  return (
    <TodoListBlock>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
        />
      ))}
    </TodoListBlock>
  );
}
export default React.memo(TodoList);
