import { useState } from "react";

const TodoNew = (props) => {
  const { addNewTodo } = props;
  const [valueInput, setValueInput] = useState("");

  const handleOnChange = (name) => {
    setValueInput(name);
  };
  const handleClick = () => {
    addNewTodo(valueInput);
    setValueInput("");
  };
  return (
    <>
      <div className="todo-input">
        <input
          type="text"
          value={valueInput}
          onChange={(e) => handleOnChange(e.target.value)}
        />
        <button onClick={handleClick}>Add</button>
        <div className="todo-text">My text input is = {valueInput}</div>
      </div>
    </>
  );
};

export default TodoNew;
