import './ConfirmModal.css';

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body">
          <p className="modal-message">{message}</p>
        </div>
        <div className="modal-actions">
          <button onClick={onCancel} className="btn btn-secondary">
            취소
          </button>
          <button onClick={onConfirm} className="btn btn-danger">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
