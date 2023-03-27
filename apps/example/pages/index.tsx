import ColumnView from '../components/ColumnView';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
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

      <div className={'md:container flex justify-center items-center'}>
        <ColumnView />
      </div>
    </div>
  );
}

export default Index;
