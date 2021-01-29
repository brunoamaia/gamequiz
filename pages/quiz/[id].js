import React from 'react';
import { ThemeProvider } from 'styled-components';

import QuizScreen from '../../src/screens/QuizScreen';

// eslint-disable-next-line react/prop-types
export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    // eslint-disable-next-line react/prop-types
    <ThemeProvider theme={dbExterno.theme}>
      {/* eslint-disable-next-line react/prop-types */}
      <QuizScreen externalBg={dbExterno.bg} externalQuestions={dbExterno.questions} />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');

  const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then((respostaDoServer) => {
      if (respostaDoServer.ok) {
        return respostaDoServer.json();
      }
    })
    .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto)
    .catch((err) => {
      console.log(err);
    });

  return {
    props: {
      dbExterno,
    },
  };
}
