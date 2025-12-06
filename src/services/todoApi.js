// 백엔드 API 기본 URL (환경 변수에서 가져옴)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// 에러 처리 헬퍼 함수
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = '요청에 실패했습니다.';
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch (e) {
      // JSON 파싱 실패 시 상태 코드 기반 메시지
      if (response.status === 404) {
        errorMessage = '요청한 리소스를 찾을 수 없습니다.';
      } else if (response.status === 500) {
        errorMessage = '서버 오류가 발생했습니다.';
      } else if (response.status === 0 || response.status >= 500) {
        errorMessage = '서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.';
      }
    }
    throw new Error(errorMessage);
  }
  return response.json();
};

// 네트워크 에러 처리
const handleNetworkError = (error) => {
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    throw new Error('백엔드 서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.');
  }
  throw error;
};

// 할일 목록 조회
export const getTodos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await handleResponse(response);
    return data.todos || [];
  } catch (error) {
    console.error('할일 목록 조회 에러:', error);
    handleNetworkError(error);
    throw error;
  }
};

// 할일 생성
export const createTodo = async (todoData) => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    const data = await handleResponse(response);
    return data.todo;
  } catch (error) {
    console.error('할일 생성 에러:', error);
    handleNetworkError(error);
    throw error;
  }
};

// 할일 수정
export const updateTodo = async (id, todoData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    const data = await handleResponse(response);
    return data.todo;
  } catch (error) {
    console.error('할일 수정 에러:', error);
    handleNetworkError(error);
    throw error;
  }
};

// 할일 삭제
export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await handleResponse(response);
    return data.todo;
  } catch (error) {
    console.error('할일 삭제 에러:', error);
    handleNetworkError(error);
    throw error;
  }
};

