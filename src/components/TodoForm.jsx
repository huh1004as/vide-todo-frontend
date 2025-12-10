import { useState, useEffect } from 'react';
import './TodoForm.css';

const TodoForm = ({ todo, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description || '');
  const [completed, setCompleted] = useState(todo?.completed || false);
  const [error, setError] = useState('');

  // todo prop이 변경될 때마다 폼 필드를 업데이트
  useEffect(() => {
    if (todo) {
      // 수정 모드: 선택된 할일의 데이터로 채우기
      setTitle(todo.title || '');
      setDescription(todo.description || '');
      setCompleted(todo.completed || false);
    } else {
      // 새 할일 추가 모드: 폼 초기화
      setTitle('');
      setDescription('');
      setCompleted(false);
    }
    setError('');
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('제목을 입력해주세요.');
      return;
    }

    setError('');
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      completed,
    });

    // 수정 완료 후 폼 초기화
    if (todo) {
      setTitle('');
      setDescription('');
      setCompleted(false);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="title">제목 *</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할일 제목을 입력하세요"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">설명</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="할일 설명을 입력하세요 (선택사항)"
          className="form-textarea"
          rows="3"
        />
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="form-checkbox"
          />
          <span>완료됨</span>
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {todo ? '수정하기' : '추가하기'}
        </button>
        {todo && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            취소
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;

