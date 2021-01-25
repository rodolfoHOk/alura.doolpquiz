import { createGlobalStyle, ThemeProvider } from 'styled-components'
import db from '../db.json'

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
`

/* padrao original
const theme = {
  colors: {
    primary: '#0070f3',
  },
}
*/

const theme = db.theme_halloween;

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
          <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
