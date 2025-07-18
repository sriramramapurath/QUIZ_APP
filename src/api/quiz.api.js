// src/api/quiz.api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // match backend route prefix
});

// ✅ Get all questions
export const getQuestions = async () => {
  try {
    const res = await API.get('/quiz');
    return res.data;
  } catch (err) {
    console.error('Error fetching questions:', err);
    return [];
  }
};

// ✅ Create a new question
export const createQuestion = async (formData) => {
  try {
    const res = await API.post('/quiz', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (err) {
    console.error('Error creating question:', err);
  }
};

// ✅ Delete a question
export const deleteQuestion = async (id) => {
  const res = await fetch(`http://localhost:5000/api/quiz/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};

export const updateQuestion = async (id, data) => {
  const res = await fetch(`http://localhost:5000/api/quiz/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
