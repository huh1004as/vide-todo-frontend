import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import ConfirmModal from './components/ConfirmModal';
import { getTodos, createTodo, updateTodo, deleteTodo } from './services/todoApi';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // 할일 목록 불러오기
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError('');
      const todosData = await getTodos();
      setTodos(todosData || []);
    } catch (err) {
      const errorMessage = err.message || '할일 목록을 불러오는데 실패했습니다.';
      setError(errorMessage);
      console.error('할일 목록 불러오기 에러:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // 할일 추가
  const handleAddTodo = async (todoData) => {
    try {
      setError('');
      const newTodo = await createTodo(todoData);
      setTodos([newTodo, ...todos]);
    } catch (err) {
      setError(err.message || '할일 추가에 실패했습니다.');
      console.error(err);
    }
  };

  // 할일 수정
  const handleUpdateTodo = async (todoData) => {
    try {
      setError('');
      const updatedTodo = await updateTodo(editingTodo._id, todoData);
      setTodos(todos.map(todo => 
        todo._id === updatedTodo._id ? updatedTodo : todo
      ));
      setEditingTodo(null);
    } catch (err) {
      setError(err.message || '할일 수정에 실패했습니다.');
      console.error(err);
    }
  };

  // 할일 삭제 확인 모달 열기
  const handleDeleteClick = (id) => {
    setDeleteConfirm(id);
  };

  // 할일 삭제 확인
  const handleConfirmDelete = async () => {
    if (!deleteConfirm) return;

    try {
      setError('');
      await deleteTodo(deleteConfirm);
      setTodos(todos.filter(todo => todo._id !== deleteConfirm));
      if (editingTodo && editingTodo._id === deleteConfirm) {
        setEditingTodo(null);
      }
      setDeleteConfirm(null);
    } catch (err) {
      setError(err.message || '할일 삭제에 실패했습니다.');
      console.error(err);
      setDeleteConfirm(null);
    }
  };

  // 할일 삭제 취소
  const handleCancelDelete = () => {
    setDeleteConfirm(null);
  };

  // 할일 완료 상태 토글
  const handleToggleComplete = async (todo) => {
    try {
      setError('');
      const updatedTodo = await updateTodo(todo._id, {
        title: todo.title,
        description: todo.description,
        completed: !todo.completed,
      });
      setTodos(todos.map(t => 
        t._id === updatedTodo._id ? updatedTodo : t
      ));
    } catch (err) {
      setError(err.message || '할일 상태 변경에 실패했습니다.');
      console.error(err);
    }
  };

  // 수정 모드 시작
  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  // 폼 제출 처리
  const handleFormSubmit = (todoData) => {
    if (editingTodo) {
      handleUpdateTodo(todoData);
    } else {
      handleAddTodo(todoData);
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1>할일 관리 앱</h1>
          <p>할일을 추가, 수정, 삭제하고 완료 상태를 관리하세요</p>
        </header>

        {error && (
          <div className="error-banner">
            {error}
            <button onClick={() => setError('')} className="error-close">×</button>
          </div>
        )}

        <div className="todo-section">
          <div className="todo-form-section">
            <h2>{editingTodo ? '할일 수정' : '새 할일 추가'}</h2>
            <TodoForm
              todo={editingTodo}
              onSubmit={handleFormSubmit}
              onCancel={handleCancelEdit}
            />
          </div>

          <div className="todo-list-section">
            <div className="todo-list-header">
              <h2>할일 목록 ({todos.length})</h2>
              <button 
                onClick={fetchTodos} 
                className="btn btn-refresh"
                disabled={loading}
              >
                {loading ? '로딩중...' : '새로고침'}
              </button>
            </div>
            {loading && todos.length === 0 ? (
              <div className="loading">할일 목록을 불러오는 중...</div>
            ) : (
              <TodoList
                todos={todos}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                onToggleComplete={handleToggleComplete}
              />
            )}
          </div>
        </div>
      </div>
      {deleteConfirm && (
        <ConfirmModal
          message="정말 삭제하시겠습니까?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default App;
