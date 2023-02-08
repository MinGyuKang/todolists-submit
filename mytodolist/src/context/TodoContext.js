import React, { useReducer, createContext, useContext, useRef } from "react";

const initialTodos = [
  {
    id: 1,
    text: "책읽기",
    done: true,
  },
  {
    id: 2,
    text: "저녁먹기",
    done: true,
  },
  {
    id: 3,
    text: "과제 복습하기",
    done: false,
  },
  {
    id: 4,
    text: "산책하기",
    done: false,
  },
];

function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return state.concat(action.todo);
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// 전역 context로 같이 감싸줬다
//! use리듀서를 전역적으로 써주기 위한 방법 !//
//! state 와 dispatch 를 함께 넣어주는 대신에, 두개의 Context 를 만들어서 따로 따로 넣어줌(불필요한 렌더링 방지) !//
//!
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

//! 커스텀 훅 + 전역 Context !//
// state와 dispatch, ref에 관한 커스텀 훅

// 원래는 각 파일에 useContext로 각각 써줘야하지만 커스텀 훅으로 합쳐줬다.
export function useTodoState() {
  const context = useContext(TodoStateContext);
  // 위에 문장에서 context가 value={state}를 의미
  // props 대신 방법
  if (!context) {
    return new Error("Cannot find TodoProvider");
  }
  // return useContext(TodoStateContext);
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  //<TodoDispatchContext.Provider value={dispatch}>
  if (!context) {
    return new Error("Cannot find TodoProvider");
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  // <TodoNextIdContext.Provider value={nextId}>
  if (!context) {
    return new Error("Cannot find TodoProvider");
  }
  return context;
}
