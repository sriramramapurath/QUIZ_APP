// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { getQuestions } from '../api/quiz.api';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const data = await getQuestions();
        setQuestions(data);
      } catch (err) {
        console.error('Failed to fetch questions:', err);
      }
    }

    fetchQuestions();
  }, []);

  const handleAnswerChange = (qIndex, value) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctAnswers = questions.filter((q, index) => answers[index] === q.answer);
    const score = correctAnswers.length;
    navigate('/success', { state: { score, total: questions.length } });
  };

  return (
    <div className="home-wrapper">
      <h1 className="play-title ">QUIZ</h1>
      <p className="subtitle">Ready? Let's go!</p>
      <form onSubmit={handleSubmit} className="quiz-form">
        {questions.map((q, index) => (
          <div key={q.id} className="question-card card shadow-sm">
            <div className="card-body">
              <p className="question-text">{index + 1}. {q.question}</p>
              {q.image && (
                <img
                  src={`http://localhost:5000/uploads/${q.image}`}
                  alt="quiz"
                  className="quiz-image img-fluid rounded"
                />
              )}
              <div className="option-grid">
                {q.options.map((opt, i) => {
                  const selected = answers[index] === opt;
                  return (
                    <label
                      key={i}
                      className={`option-card card ${selected ? 'selected' : ''}`}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={opt}
                        onChange={() => handleAnswerChange(index, opt)}
                        className="visually-hidden"
                      />
                      <div className="card-body p-2">
                        <p className="option-text mb-0">{opt}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
        {questions.length > 0 && (
          <button type="submit" className="btn btn-success mt-4">SUBMIT</button>
        )}
      </form>
    </div>
  );
}
