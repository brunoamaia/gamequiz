import React from 'react';
import Router from 'next/router';

import db from '../../../../db.json';
import Button from '../../Button';
import Link from '../../Link';
import Widget from '../../Widget';

// eslint-disable-next-line react/prop-types
function ResultWidget({ name, results, totalQuestions }) {
  // eslint-disable-next-line react/prop-types
  const acertos = results.filter((x) => x).length;
  let response;
  let image;
  if (acertos === 0) {
    response = 0;
    image = 'https://media.giphy.com/media/eJ4j2VnYOZU8qJU3Py/giphy.gif';
  } else if (acertos === 1) {
    response = 1;
    image = 'https://media.giphy.com/media/eJ4j2VnYOZU8qJU3Py/giphy.gif';
  } else if (acertos < totalQuestions) {
    response = 2;
    image = 'https://media.giphy.com/media/3IcEq6Cq9R9ErPoZIK/giphy-downsized.gif';
  } else {
    response = 3;
    image = 'https://media.giphy.com/media/xT1Ra5LNExcNOgUUso/giphy-downsized.gif';
  }

  // eslint-disable-next-line react/prop-types
  name = name.toUpperCase();

  return (
    <>
      <Widget>
        <Widget.Header>
          <h1>Quiz finalizado</h1>
        </Widget.Header>

        <Widget.Content>
          <h3>
            {response === 0 && `Ops ${name}, aprece que foi por pouco, tente novamente.`}
            {response === 1 && `Tente novamente ${name}, você acertou ${acertos} questão de ${totalQuestions}.`}
            {response === 2 && `Boa ${name}, você acertou ${acertos} questões de ${totalQuestions}. Acho que pode fazer melor!`}
            {response === 3 && `Parabéns ${name}!!! você acertou TODAS as questões. Você investiu muito bem o seu tempo!!!`}
          </h3>

          <br />
          <img
            alt="Descrição"
            style={{
              width: '100%',
              height: '150px',
              objectFit: 'cover',
            }}
            src={image}
          />

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

      <Widget>
        <Widget.Content>
          <h1>Quizes da Galera</h1>
          <ul>
            {db.external.map((linkExterno) => {
              const [projectName, githubUser] = linkExterno
                .replace('https://', '')
                .replace('.vercel.app/', '')
                .split('.');

              return (
                <li key={linkExterno}>
                  <Widget.Topic
                    as={Link}
                    href={`./quiz/${projectName}___${githubUser}?name=${name}`}
                  >
                    {`${githubUser}/${projectName}`}
                  </Widget.Topic>
                </li>
              );
            })}
          </ul>
        </Widget.Content>
      </Widget>

    </>
  );
}

export default ResultWidget;
