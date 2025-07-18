import React from "react";
import "./Success.css";

export default function Success() {
  return (
    <div className="success-container">
      <div className="icon">✅</div>
      <h1 className="message">Successfully Submitted!</h1>
      <p className="score-text">Your score has been recorded.</p>
    </div>
  );
}
