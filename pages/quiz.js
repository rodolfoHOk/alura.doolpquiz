/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import QuizBackground from '../src/Components/QuizBackground';
import QuizContainer from '../src/Components/QuizContainer';
import QuizLogo from '../src/Components/QuizLogo';
import Widget from '../src/Components/Widget';
import Button from '../src/Components/Button';
import db from '../db.json';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
  acertos,
  setAcertos,
}) {
  const questionId = `question_${questionIndex}`;
  const [resposta, setResposta] = useState(null);

  const quizStates = {
    PERGUNTANDO: 'PERGUNTANDO',
    ACERTOU: 'ACERTOU',
    ERROU: 'ERROU',
  };

  const [quizState, setQuizState] = useState(quizStates.PERGUNTANDO);

  return (
    <Widget>
      <Widget.Header>
        {/* <BackLinkArrow href="/" /> */}
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descricao da Imagem"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />

      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <form
          onSubmit={(infoDoEvento) => {
            infoDoEvento.preventDefault();
            if (resposta === question.answer) {
              setQuizState(quizStates.ACERTOU);
              setAcertos(acertos + 1);
            } else {
              setQuizState(quizStates.ERROU);
            }
            setTimeout(() => {
              setQuizState(quizStates.PERGUNTANDO);
              setResposta(null);
              onSubmit();
            }, 2 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative_${alternativeIndex}`;
            return (
              <>
                { resposta === alternativeIndex && (
                  <Widget.Topic.Selected
                    as="label"
                    htmlFor={alternativeId}
                  >
                    <input
                      type="radio"
                      id={alternativeId}
                      name={questionId}
                      value={alternativeIndex}
                      onChange={() => {
                        setResposta(alternativeIndex);
                      }}
                    />
                    {alternative}
                  </Widget.Topic.Selected>
                )}

                { resposta !== alternativeIndex && (
                  <Widget.Topic
                    as="label"
                    htmlFor={alternativeId}
                  >
                    <input
                      type="radio"
                      id={alternativeId}
                      name={questionId}
                      value={alternativeIndex}
                      onChange={() => {
                        setResposta(alternativeIndex);
                      }}
                    />
                    {alternative}
                  </Widget.Topic>
                )}
              </>
            );
          })}

          { quizState === quizStates.PERGUNTANDO && (
            <Button type="submit" disabled={resposta === null}>
              Confirmar
            </Button>
          )}

          { quizState === quizStates.ACERTOU && (
            <Button.Green type="submit" disabled={resposta === null}>
              Correto
            </Button.Green>
          )}

          { quizState === quizStates.ERROU && (
            <Button.Red type="submit" disabled={resposta === null}>
              Errado
            </Button.Red>
          )}

        </form>

        {/* serve para visualizar em json o que há na varialvel question
        <pre>
          {JSON.stringify(question, null, 4)}
        </pre>
        */}

      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  LOADING: 'LOADING',
  QUIZ: 'QUIZ',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const router = useRouter();
  const { name } = router.query;

  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const [acertos, setAcertos] = useState(0);

  // Estados || States
  // React.useEffect
  // [React chama de Efeitos || Effects]
  // nasce === didMount
  // atualizado === willUpdate
  // morre === willUnmount

  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Content>
            <h2>
              {`Olá ${name}`}
            </h2>
          </Widget.Content>
        </Widget>

        { screenState === screenStates.LOADING && <LoadingWidget /> }

        { screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            onSubmit={handleSubmitQuiz}
            acertos={acertos}
            setAcertos={setAcertos}
          />
        )}

        { screenState === screenStates.RESULT && (
          <Widget>
            <Widget.Header>
              Resultado
            </Widget.Header>

            <Widget.Content>
              <p>{`Parabéns vc acertou ${acertos} questões!`}</p>
            </Widget.Content>
          </Widget>
        )}

      </QuizContainer>
    </QuizBackground>
  );
}
