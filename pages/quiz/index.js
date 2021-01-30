/* eslint-disable react/prop-types */
import React from 'react';
import QuizScreen from '../../src/screens/Quiz';
import db from '../../db.json';

export default function QuizPage() {
  const { questions, bg } = db;
  return (
    <QuizScreen externalQuestions={questions} externalBg={bg} />
  );
}
