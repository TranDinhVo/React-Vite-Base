import { useState } from "react";
import TodoNew from "./TodoNew";
import TodoData from "./TodoData";
import reactLogo from "../../assets/react.svg";
import "./Todo.css";

const Todo = () => {
  const [todoList, setTodoList] = useState([
    { id: 1, name: "Learning React " },
    { id: 2, name: "Watching Youtube " },
  ]);
  const addNewTodo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(1, 10000000000),
      name: name,
    };
    setTodoList([...todoList, newTodo]);
  };
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const handleDelete = (id) => {
    const result = todoList.filter((item) => item.id !== id);
    setTodoList(result);
  };
  return (
    <>
      <div className="todo-container">
        <div className="todo-title">Todo List</div>
        <TodoNew addNewTodo={addNewTodo} />
        {todoList.length > 0 ? (
          <TodoData todoList={todoList} handleDelete={handleDelete} />
        ) : (
          <div className="todo-image">
            <img src={reactLogo} />
          </div>
        )}
      </div>
      ;
    </>
  );
};
export default Todo;
