import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/Components/Widget';
import Footer from '../src/Components/Footer';
import GitHubCorner from '../src/Components/GitHubCorner';
import QuizBackground from '../src/Components/QuizBackground';
import QuizLogo from '../src/Components/QuizLogo';
import Button from '../src/Components/Button';
import Input from '../src/Components/Input';

/* importado do arquivo agora - QuizBackgroung
const BackgroundImage = styled.div`
  background-image: url(${db.bg});
  flex: 1;
  background-size: cover;
  background-position: center;
`;
*/

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  // console.log('Retorno do useState', name, setName);
  const changed = (infoDoEvento) => {
    // console.log(infoDoEvento.target.value);
    setName(infoDoEvento.target.value);
  };

  return (
    <QuizBackground backgroundImage={db.bg}>

      <Head>
        <title>DoolpQuiz - Imersão React v2 Alura </title>
        <meta property="og:image" content={db.bg} />
        <meta property="og:image:type" content="image/jpeg" />
      </Head>

      <QuizContainer>

        <QuizLogo />

        <Widget>
          <Widget.Header>
            <h1>
              Doolp Quiz
            </h1>
          </Widget.Header>
          <Widget.Content>
            <p>
              Divirta-se criando e jogando seu AluraQuiz!
            </p>
            <form onSubmit={function Submeter(infoDoEvento) {
              infoDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
              // console.log('Submetendo por react');
            }}
            >
              <Input
                placeholder="Nome ou Apelido Aqui"
                onChange={changed}
              />
              <Button type="submit" disabled={name.length === 0}>
                Jogar:
                {'  '}
                {name}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>
              Quizes da Galera
            </h1>

            <p>dno cneoivq vrnoewn...</p>
          </Widget.Content>
        </Widget>

        <Footer />

      </QuizContainer>

      <GitHubCorner projectUrl="https://github.com/rodolfoHOk/doolpquiz" />
    </QuizBackground>
  );
}
