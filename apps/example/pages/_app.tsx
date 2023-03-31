import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to react-column-view!</title>
      </Head>

      <main className="app">
        <div className="bg-gradient-to-r from-green-400 to-blue-500 h-screen w-screen">
          <Component {...pageProps} />
        </div>
      </main>
    </>
  );
}

export default CustomApp;
