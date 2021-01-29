/* eslint-disable react/prop-types */
import React from 'react';
import { useRouter } from 'next/router';

import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import LoadingWidget from '../src/components/QuizWidgets/LoadingWidget';
import QuestionWidget from '../src/components/QuizWidgets/QuestionWidget';
import ResultWidget from '../src/components/QuizWidgets/ResultWidget';

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

  const router = useRouter();
  // eslint-disable-next-line prefer-destructuring
  const name = router.query.name;

  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 2000);
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
        {screenState === screenStates.LOADING && <LoadingWidget name={name} />}
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            addResult={addResult}
            onSubmit={handleSubmitQuiz}
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
          />
        )}
        {screenState === screenStates.RESULT && (
          <ResultWidget name={name} results={results} totalQuestions={totalQuestions} />
        )}

      </QuizContainer>
    </QuizBackground>
  );
}
