import React from 'react';
import Head from 'next/head';

import db from '../db.json';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';

export default function QuizPage() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Gamequiz - jogar</title>
      </Head>

      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>Quiz sobre Jogos Clássicos</h1>
          </Widget.Header>

          <Widget.Content>
            <div>
              Batata
            </div>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/brunoamaia/gamequiz" />
    </QuizBackground>
  );
}
