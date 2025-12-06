import './TodoItem.css';

const TodoItem = ({ todo, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <div className="todo-header">
          <h3 className="todo-title">{todo.title}</h3>
          <span className={`todo-status ${todo.completed ? 'done' : 'pending'}`}>
            {todo.completed ? '완료' : '진행중'}
          </span>
        </div>
        {todo.description && (
          <p className="todo-description">{todo.description}</p>
        )}
        <div className="todo-date">
          {new Date(todo.createdAt).toLocaleString('ko-KR')}
        </div>
      </div>
      <div className="todo-actions">
        <button
          onClick={() => onToggleComplete(todo)}
          className={`btn btn-toggle ${todo.completed ? 'btn-undo' : 'btn-complete'}`}
        >
          {todo.completed ? '미완료로 변경' : '완료하기'}
        </button>
        <button
          onClick={() => onEdit(todo)}
          className="btn btn-edit"
        >
          수정
        </button>
        <button
          onClick={() => onDelete(todo._id)}
          className="btn btn-delete"
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default TodoItem;

