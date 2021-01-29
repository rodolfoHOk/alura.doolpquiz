/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ dbExterno }) {
  const { questions } = dbExterno;
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen externalQuestions={questions} externalBg={dbExterno.bg} />
    </ThemeProvider>

  /* console.log do react :)
      <pre style={{ color: 'black' }}>
        {JSON.stringify(questions, null, 4)}
      </pre>
      */
  );
}

// eslint-disable-next-line no-unused-vars
export async function getServerSideProps(context) {
  // console.log('Next nos fornece', context);
  // console.log('query id:', context.query.id);
  const [projectName, gitHubUser] = context.query.id.split('___');
  const dbExterno = await fetch(`https://${projectName}.${gitHubUser}.vercel.app/api/db`)
    .then((respostaDoserver) => {
      if (respostaDoserver.ok) {
        return respostaDoserver.json();
      }
      throw new Error('Falha em pegar os dados');
    })
    .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto)
    .catch((Error) => {
      console.error(Error);
    });

  // console.log('dbExterno', dbExterno);

  return {
    props: {
      dbExterno,
    }, // will be passed to the page component as props
  };
}
