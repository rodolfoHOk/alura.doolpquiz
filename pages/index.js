import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import db from '../db.json';
import Widget from '../src/Components/Widget';
import Footer from '../src/Components/Footer';
import GitHubCorner from '../src/Components/GitHubCorner';
import QuizBackground from '../src/Components/QuizBackground';
import QuizContainer from '../src/Components/QuizContainer';
import QuizLogo from '../src/Components/QuizLogo';
import Button from '../src/Components/Button';
import Input from '../src/Components/Input';
import Link from '../src/Components/Link';

/* importado do arquivo agora - QuizBackgroung
const BackgroundImage = styled.div`
  background-image: url(${db.bg});
  flex: 1;
  background-size: cover;
  background-position: center;
`;
*/

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  // console.log('Retorno do useState', name, setName);

  return (
    <QuizBackground backgroundImage={db.bg}>

      <Head>
        <meta property="og:image" content={db.bg} />
        <meta property="og:image:type" content="image/jpeg" />
      </Head>

      <QuizContainer>

        <QuizLogo />

        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
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
                name="nome do jogador"
                value={name}
                placeholder="Nome ou Apelido Aqui"
                onChange={(infoDoEvento) => setName(infoDoEvento.target.value)}
              />
              <Button type="submit" disabled={name.length === 0}>
                { `Jogar: ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>
              Quizes da Galera
            </h1>

            <ul>
              {db.external.map((linkExterno, index) => {
                const linkId = `link_${index}`;
                const [projectName, gitHubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');
                return (
                  <li
                    key={linkId}
                  >
                    <Widget.Topic
                      as={Button.External}
                      disabled={name.length === 0}
                    >
                      <Link
                        href={`/quiz/${projectName}___${gitHubUser}?name=${name}`}
                      >
                        {`${gitHubUser}/${projectName}`}
                      </Link>
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>

            { name.length === 0 && <p style={{ 'text-align': 'right' }}>* Digite o nome ou apelido</p> }

          </Widget.Content>
        </Widget>

        <Footer
          as={motion.footer}
          transition={{ delay: 1, duration: 0.5 }}
          variants={{
            show: { opacity: 1, x: '0' },
            hidden: { opacity: 0, x: '100%' },
          }}
          initial="hidden"
          animate="show"
        />

      </QuizContainer>

      <GitHubCorner projectUrl="https://github.com/rodolfoHOk/doolpquiz" />
    </QuizBackground>
  );
}
