// src/pages/AddQuestion.jsx
import React, { useState } from 'react';
import './AddQuestion.css';
import { createQuestion } from '../api/quiz.api';

export default function AddQuestion() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState('');
  const [image, setImage] = useState(null);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('question', question);
    formData.append('options', JSON.stringify(options));
    formData.append('answer', answer);
    if (image) formData.append('image', image);

    try {
      // Replace URL with actual backend endpoint
      for (let [key, value] of formData.entries()) {
  if (!(value instanceof File)) {
    console.log(`${key}:`, value);
  }
}
      const res = await createQuestion(formData);
      if (res.ok) {
        alert('Question added successfully');
        setQuestion('');
        setOptions(['', '', '', '']);
        setAnswer('');
        setImage(null);
      } else {
        alert('Question added successfully');
      }
    } catch (err) {
      console.error('Error adding question:', err);
      alert('Error submitting question');
    }
  };

  return (
    <div className="add-question-container">
      <h1>Add New Question</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Question:
          <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} required />
        </label>

        {options.map((opt, i) => (
          <label key={i}>
            Option {String.fromCharCode(65 + i)}:
            <input type="text" value={opt} onChange={(e) => handleOptionChange(i, e.target.value)} required />
          </label>
        ))}

        <label>
          Correct Answer:
          <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} required />
        </label>

        <label>
          Upload Image (optional):
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
