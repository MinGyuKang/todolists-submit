import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import { IoAddOutline } from "react-icons/io5";
import { useTodoDispatch } from "../context/TodoContext";
import { useTodoNextId } from "../context/TodoContext";

const CircleButton = styled.button`
  &:hover {
    background-color: #000000;
  }
  &:active {
    background-color: #bef111;
  }

  display: flex; // 안에 요소 때문에 여기서도 flex 들 사용
  justify-content: center;
  align-items: center;
  position: absolute;

  font-size: 100px;
  font-weight: bold;
  border-radius: 100%;
  border: none;
  /* outline: none; */
  cursor: pointer;
  z-index: 100;

  width: 50px;
  height: 50px;
  left: 50%;
  bottom: 0%;
  background-color: #bef1f7;
  color: #ffffff;

  transition: 0.15s all ease;
  transform: translateX(-50%); // 이거까지 해줘야 X축 가운데옴.
  ${(props) =>
    props.open &&
    css`
      background: #ffffff;
      color: #bef1f7;
      &:hover {
        background: #000000;
      }
      &:active {
        background: #bef1f7;
        color: #000000;
      }
      // Y 50% 해야 걸침. bottom: 0%로 했기 때문
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;

  /* flex: 1; */
  /* height: 80px; */
`;

const InsertForm = styled.form`
  /* 마진오토는 박스 안 중앙정렬 */
  /* 마진 바텀 줘버리면 폼 태그가 붕뜨기 때문에 밑에 설정해둔 radius가 위로 올라가게 된다. 따라서 padding으로 설정 */
  margin: auto;

  padding-top: 30px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;

  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
  border-top: 1px solid #939899;

  height: 80px;
  background-color: #d4d9d6;
`;

const Input = styled.input`
  width: 100%;
  height: 60%;
  border-radius: 16px;
  font-size: 18px;
  outline: none;
  border: 1px solid #939899;

  /* margin-top: 10px;/ */
  /* 위에 form태그에서 padding으로 이미 설정해줬기 때문에 margin써도 그대로임 */
  /* margin: auto; */
  padding: 12px;
  /* 내가 생각했던 크기가 안맞으면 박스 사이징 다시 써주자 */
  box-sizing: border-box;
`;

function TodoCreate() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  // 커스텀 훅(useContext가 아닌 useTodo~~~들로 작성)과 Context API를 활용해서 한 곳에 모아놓고 따로 props으로 내리지 않아도 바로 쓸 수 있다.
  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();

  const onToggle = () => setOpen(!open);
  const onChange = (e) => setValue(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "CREATE",
      todo: {
        id: nextId.current,
        text: value,
        done: false,
      },
    });
    setValue("");
    setOpen(false);
    nextId.current += 1;
  };

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input
              autoFocus
              placeholder="입력 후, Enter 누르세요"
              value={value}
              onChange={onChange}
            />
          </InsertForm>
        </InsertFormPositioner>
      )}
      {/* CircleButton을 absolute로 위치시켰기 때문에 위치 무관 */}
      <CircleButton onClick={onToggle} open={open}>
        <IoAddOutline />
      </CircleButton>
    </>
  );
}
//   <TodoStateContext.Provider value={state}>
//     <TodoDispatchContext.Provider value={dispatch}>
// 위 구조처럼 좀 더 상위에 있는 state가 바뀔 때 불필요하게 그 밑에 있는 dispatch 부분(create파일에서 전역 context 내려주고 있는 부분)도 렌더링될 수 있기 때문에 그걸 사전에 방지하기 위해서 썻다
// 만약 dispatch 와 state 분리를 안했다면(props을 value={state, dispatch} 두 개 내렸다면) useContext에 이 두개 값이 포함되어 있기 때문에 하나가 변하면 전체가 재렌더링된다.
export default React.memo(TodoCreate);
