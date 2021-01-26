import React from 'react';
import styled from 'styled-components';
import QuizBackground from '../src/Components/QuizBackground';
import db from '../db.json';

const QuizPageContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function QuizPage() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizPageContainer>
        <h1>Futura Página do Quiz</h1>
        <p>Em construção</p>
      </QuizPageContainer>
    </QuizBackground>
  );
}
