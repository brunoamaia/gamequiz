import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>

      <Head>
        <title>Gamequiz</title>
      </Head>

      <QuizContainer>
        <QuizLogo />

        <Widget>
          <Widget.Header>
            <h1>Quiz sobre Jogos Clássicos</h1>
          </Widget.Header>

          <Widget.Content>
            {/* eslint-disable-next-line func-names */}
            <form onSubmit={function (infosEvent) {
              infosEvent.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <input
                // eslint-disable-next-line func-names
                onChange={function (infosEvent) {
                  setName(infosEvent.target.value);
                }}
                placeholder="Qual seu nome?"
              />
              <button type="submit" disabled={name.length === 0}>
                {`Bora ${name}`}
              </button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quiz sobre Jogos Clássicos</h1>
            <p>Lorem ipsum</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/brunoamaia/gamequiz" />
    </QuizBackground>
  );
}
