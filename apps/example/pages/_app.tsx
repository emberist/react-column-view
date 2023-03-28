import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Button from '../components/Button';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const { push } = useRouter();

  return (
    <>
      <Head>
        <title>Welcome to react-column-view!</title>
      </Head>
      <main className="app">
        <div
          className={
            'bg-gradient-to-r from-green-400 to-blue-500 pin h-screen w-screen flex flex-col items-center justify-center'
          }
        >
          <div
            className={
              'text-4xl sm:text-6xl lg:text-7xl font-bold pb-10 text-white'
            }
          >
            React Column View
          </div>

          <div className="p-3">
            <Button
              onClick={() => {
                push('/');
              }}
            >
              Basic Example
            </Button>

            <Button
              onClick={() => {
                push('/with-initial-values');
              }}
            >
              With defauls Example
            </Button>
          </div>

          <div className={'md:container flex justify-center items-center'}>
            <Component {...pageProps} />
          </div>
        </div>
      </main>
    </>
  );
}

export default CustomApp;
