import styled from 'styled-components'
import Head from 'next/head'
import db from '../db.json'
import Widget from '../src/Components/Widget'
import Footer from '../src/Components/Footer'
import GitHubCorner from '../src/Components/GitHubCorner'
import QuizBackground from '../src/Components/QuizBackground'
import QuizLogo from '../src/Components/QuizLogo'

/* importado do arquivo agora
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
  return (
    <QuizBackground backgroundImage={db.bg}>
      
      <Head>
        <title>DoolpQuiz - Imersão React v2 Alura </title>
        <meta property="og:image" content={db.bg}/>
        <meta property="og:image:type" content="image/jpeg"/>
        <meta property="og:image:width" content="1536"/>
        <meta property="og:image:height" content="1208"/> 
      </Head>
      
      <QuizContainer>

        <QuizLogo/>

        <Widget>
          <Widget.Header>
            <h1>
              Doolp Quiz
            </h1>
          </Widget.Header>
          <Widget.Content>
            <p>dno cneoivq vrnoewn...</p>
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

      <GitHubCorner projectUrl="https://github.com/omariosouto"/>
    </QuizBackground>
  );
}
