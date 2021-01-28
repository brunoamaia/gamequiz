// eslint-disable react/prop-types
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import db from '../db.json';
import AlternativesForm from '../src/components/AlternativesForm';
import Button from '../src/components/Button';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        Buscando os dados...
      </Widget.Content>
    </Widget>
  );
}

// eslint-disable-next-line react/prop-types
function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        <h1>Quiz finalizado</h1>
      </Widget.Header>

      <Widget.Content>
        <h3>
          {'Você acertou '}
          {/* eslint-disable-next-line react/prop-types */}
          {/* results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if (isAcerto) {
              return somatoriaAtual + 1;
            }

            return somatoriaAtual;
          }, 0) */}

          {/* eslint-disable-next-line react/prop-types */}
          {results.filter((x) => x).length}
          {' questões'}
        </h3>
        <h4>Histórico:</h4>
        <ul>
          {/* eslint-disable-next-line react/prop-types */}
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              {`#${index + 1}: ${result === true ? 'Acertou' : 'Errou'}`}
            </li>
          ))}

        </ul>
        <h3>Parabéns!</h3>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  // eslint-disable-next-line react/prop-types
  addResult,
  onSubmit,
  question,
  questionIndex,
  totalQuestions,
}) {
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState();
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const isCorrect = selectedAlternative === question.answer;
  const questionId = `question__${questionIndex}`;

  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
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
          onSubmit={(infosEvent) => {
            infosEvent.preventDefault();
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
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;

            return (
              <Widget.Topic
                as="label"
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
                key={alternativeId}
                htmlFor={alternativeId}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!(selectedAlternative !== undefined)}>
            Confirmar
          </Button>

          {isQuestionSubmited && isCorrect && <p>Você acertou!</p> }
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p> }
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}
QuestionWidget.propTypes = {
  // eslint-disable-next-line react/require-default-props
  onSubmit: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  question: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  questionIndex: PropTypes.number,
  // eslint-disable-next-line react/require-default-props
  totalQuestions: PropTypes.number,
};

const screenStates = {
  LOADING: 'LOADING',
  QUIZ: 'QUIZ',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [results, setResults] = React.useState([]);
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const question = db.questions[questionIndex];
  const totalQuestions = db.questions.length;

  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    if (questionIndex + 1 < totalQuestions) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  function addResult(result) {
    setResults([
      ...results,
      // eslint-disable-next-line no-undef
      result,
    ]);
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            addResult={addResult}
            onSubmit={handleSubmitQuiz}
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
          />
        )}
        {screenState === screenStates.RESULT && <ResultWidget results={results} />}

      </QuizContainer>
    </QuizBackground>
  );
}
