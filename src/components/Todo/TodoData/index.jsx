const TodoData = (props) => {
  const { todoList, handleDelete } = props;

  const handleClick = (id) => {
    handleDelete(id);
  };
  return (
    <>
      <div className="todo-list">
        {todoList.map((item) => (
          <div className="todo-item" key={item.id}>
            <div className="todo-content">{item.name}</div>
            <button onClick={() => handleClick(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};
export default TodoData;
