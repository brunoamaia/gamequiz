/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Router from 'next/router';

import AlternativesForm from '../../AlternativesForm';
import Button from '../../Button';
import Widget from '../../Widget';

const ArrowLeft = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  flex: 0;
  position: relative;
  left: -20px;
  margin: 0;
  padding: 0;
  font-size: 20px;
  
  button {
    background-color: inherit;
    border: none;
    color: ${({ theme }) => theme.colors.contrastText};
    cursor: pointer;
    font-size: 25px;

  }
`;

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
        <h1>
          <ArrowLeft>
            <button type="button" onClick={() => Router.push('../')}>
              &lArr;
            </button>
            {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
          </ArrowLeft>
        </h1>
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

export default QuestionWidget;
