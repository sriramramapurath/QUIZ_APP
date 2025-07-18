import React, { useEffect, useState } from 'react';
import { getQuestions, deleteQuestion, updateQuestion } from '../api/quiz.api';
import './EditQuestions.css';

export default function EditQuestions() {
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const data = await getQuestions();
    setQuestions(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      await deleteQuestion(id);
      fetchQuestions();
    }
  };

  const openEditModal = (q) => {
    setEditData({ ...q });
    setShowModal(true);
  };

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...editData.options];
    newOptions[index] = value;
    setEditData((prev) => ({ ...prev, options: newOptions }));
  };

  const handleUpdate = async () => {
    await updateQuestion(editData.id, editData);
    setShowModal(false);
    fetchQuestions();
  };

  return (
    <div className="edit-questions-container">
      <h2 className="title">Edit or Delete Questions</h2>
      <div className="question-list">
        {questions.map((q) => (
          <div className="card" key={q.id}>
            <div className="card-content">
              <h3>{q.question}</h3>
              {q.image && (
                <img
                  src={`http://localhost:5000/uploads/${q.image}`}
                  alt="quiz"
                  className="edit-image"
                />
              )}
              <ul>
                {q.options.map((opt, i) => (
                  <li key={i}>
                    {String.fromCharCode(65 + i)}. {opt}
                  </li>
                ))}
              </ul>
              <p>
                <strong>Answer:</strong> {q.answer}
              </p>
              <div className="button-row">
                <button className="btn edit" onClick={() => openEditModal(q)}>
                  Edit
                </button>
                <button className="btn delete" onClick={() => handleDelete(q.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Modal */}
      {showModal && editData && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Edit Question</h3>
            <label>Question:</label>
            <input
              type="text"
              value={editData.question}
              onChange={(e) => handleEditChange('question', e.target.value)}
            />
            {editData.options.map((opt, i) => (
              <div key={i}>
                <label>Option {String.fromCharCode(65 + i)}:</label>
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(i, e.target.value)}
                />
              </div>
            ))}
            <label>Answer:</label>
            <input
              type="text"
              value={editData.answer}
              onChange={(e) => handleEditChange('answer', e.target.value)}
            />

            <div className="modal-buttons">
              <button className="btn cancel" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn save" onClick={handleUpdate}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
