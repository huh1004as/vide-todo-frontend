import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ todos, onEdit, onDelete, onToggleComplete }) => {
  if (todos.length === 0) {
    return (
      <div className="todo-list-empty">
        <p>할일이 없습니다. 새로운 할일을 추가해보세요!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
};

export default TodoList;

