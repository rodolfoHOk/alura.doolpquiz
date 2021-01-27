import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import db from '../db.json';

/* padrao original
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`
*/

// obs: instalamos o vscode-styled-components para melhor visualizacao
// copiamos o reset base para o global style
const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
  /* New styles */
  display: flex;
  flex-direction: column;
  font-family: 'Lato', sans-serif;
  // Deixa branco no começo
  color: ${({ theme }) => theme.colors.contrastText};
}
html, body {
  min-height: 100vh;
}
#__next {
  flex: 1;
  display: flex;
  flex-direction: column;
}
`;

/* padrao original
const theme = {
  colors: {
    primary: '#0070f3',
  },
}
*/

const { theme } = db;

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>DoolpQuiz - Imersão React v2 Alura </title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
