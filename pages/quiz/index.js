/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import QuizBackground from '../../src/Components/QuizBackground';
import QuizContainer from '../../src/Components/QuizContainer';
import QuizLogo from '../../src/Components/QuizLogo';
import Widget from '../../src/Components/Widget';
import Button from '../../src/Components/Button';
import AlternativesForm from '../../src/Components/AlternativesForm';
import BackLinkArrow from '../../src/Components/BackLinkArrow';
import db from '../../db.json';

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

function ResultWidget({ results, name }) {
  /* opção a isto abaixo
  const asserts = results.reduce(((somatoriaAtual, resultadoAtual) =>
   (resultadoAtual === true ? somatoriaAtual + 1 : somatoriaAtual)), 0);
  */
  const asserts = results.filter((x) => x === true).length;
  return (
    <Widget>
      <Widget.Header>
        Tela de Resultado
      </Widget.Header>

      <Widget.Content>
        <p>{`Você ${name} acertou ${asserts} de ${results.length} questões!`}</p>
        <ul>
          {results.map((result, index) => (
            <li key={`result_${index + 1}`}>
              {`Pergunta ${index + 1} : `}
              {result === true ? 'Acertou' : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
  addResult,
}) {
  const questionId = `question_${questionIndex}`;
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const isCorrect = selectedAlternative === question.answer;
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const hasAlternativeSelected = selectedAlternative !== undefined;

  const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
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

        <AlternativesForm
          onSubmit={(infoDoEvento) => {
            infoDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
              onSubmit();
            }, 2 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative_${alternativeIndex}`;
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  type="radio"
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button
            type="submit"
            disabled={!hasAlternativeSelected}
            data-status={isQuestionSubmited && alternativeStatus}
          >
            { !isQuestionSubmited && 'Confirmar' }
            { isQuestionSubmited && isCorrect && 'Você acertou!'}
            { isQuestionSubmited && !isCorrect && 'Você errou!'}
          </Button>

        </AlternativesForm>

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
  const [results, setResults] = useState([]);

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

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
            addResult={addResult}
          />
        )}

        { screenState === screenStates.RESULT && <ResultWidget results={results} name={name} />}

      </QuizContainer>
    </QuizBackground>
  );
}
