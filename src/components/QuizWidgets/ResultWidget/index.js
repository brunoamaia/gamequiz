import React from 'react';
import Router from 'next/router';

import Button from '../../Button';
import Widget from '../../Widget';

// eslint-disable-next-line react/prop-types
function ResultWidget({ name, results, totalQuestions }) {
  // eslint-disable-next-line react/prop-types
  const acertos = results.filter((x) => x).length;
  let response;
  if (acertos === 0) {
    response = 0;
  } else if (acertos === 1) {
    response = 1;
  } else if (acertos < totalQuestions) {
    response = 2;
  } else {
    response = 3;
  }

  // eslint-disable-next-line react/prop-types
  name = name.toUpperCase();

  return (
    <Widget>
      <Widget.Header>
        <h1>Quiz finalizado</h1>
      </Widget.Header>

      <Widget.Content>
        <h3>
          {response === 0 && `${name}, tente novamente.`}
          {response === 1 && `Tente novamente ${name}, você acertou ${acertos} questão de ${totalQuestions}`}
          {response === 2 && `Boa ${name}, você acertou ${acertos} questões de ${totalQuestions}`}
          {response === 3 && `Parabéns ${name}!!! você acertou todas as questões.`}
        </h3>

        <br />
        <br />
        <Button type="button" onClick={() => Router.reload(window.location.pathname)}>
          Jogar novamente
        </Button>
        <br />
        <br />
        <br />
        <Button type="button" onClick={() => Router.push('./')}>
          Voltar para Home
        </Button>

        {/* <h4>Histórico:</h4>
        <ul>
          {// eslint-disable-next-line react/prop-types }
          { results.map((result, index) => (
            <li key={`result__${result + index}`}>
              {`#${index + 1}: ${result === true ? 'Correta' : 'Errada'}`}
            </li>
          )) }
        </ul> */}

      </Widget.Content>
    </Widget>
  );
}

export default ResultWidget;
