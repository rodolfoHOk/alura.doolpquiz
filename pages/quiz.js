/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import QuizBackground from '../src/Components/QuizBackground';
import QuizLogo from '../src/Components/QuizLogo';
import Widget from '../src/Components/Widget';
import Button from '../src/Components/Button';
import db from '../db.json';

const QuizPageContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function QuizPage() {
  const router = useRouter();
  const { name } = router.query;
  const voltar = '<';
  const [resposta, setResposta] = useState(null);
  const changed = (infoDoEvento) => {
    setResposta(infoDoEvento.target.value);
  };
  const submeter = (infoDoEvento) => {
    infoDoEvento.preventDefault();
    setResposta(infoDoEvento.target.value);
    console.log('Submentendo a ', resposta);
  };

  return (
    <QuizBackground backgroundImage={db.bg}>

      <Head>
        <title>DoolpQuiz - Imersão React v2 Alura </title>
        <meta property="og:image" content={db.bg} />
        <meta property="og:image:type" content="image/jpeg" />
      </Head>

      <QuizPageContainer>

        <QuizLogo />

        <Widget>
          <Widget.Content>
            <h2>
              Olá
              {' '}
              {name}
            </h2>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Header>
            <h1>
              <a href="/" style={{ 'text-decoration': 'none', color: '#FFFFFF' }}>{voltar}</a>
              {' '}
              Pergunta x de y
            </h1>
          </Widget.Header>
          <Widget.Content>
            <h1> Perguntando a pergunta x</h1>
            <p> Observações da pergunta x</p>
            <form onSubmit={submeter}>
              <input type="radio" id="opcaoA" name="resposta" value="respostaA" onChange={changed} />
              <label htmlFor="opcaoA">Opcao Resposta A</label>
              <br />
              <input type="radio" id="opcaoB" name="resposta" value="respostaB" onChange={changed} />
              <label htmlFor="opcaoB">Opcao Resposta B</label>
              <br />
              <input type="radio" id="opcaoC" name="resposta" value="respostaC" onChange={changed} />
              <label htmlFor="opcaoC">Opcao Resposta C</label>
              <br />
              <input type="radio" id="opcaoD" name="resposta" value="respostaD" onChange={changed} />
              <label htmlFor="opcaoD">Opcao Resposta D</label>
              <br />
              <Button type="submit" disabled={resposta === null}>
                Confirmar
              </Button>
            </form>
          </Widget.Content>
        </Widget>

      </QuizPageContainer>
    </QuizBackground>
  );
}
