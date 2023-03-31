import { useRouter } from 'next/router';
import Button from '../components/Button';

export function Index() {
  const { push } = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="text-4xl sm:text-6xl lg:text-7xl font-bold pb-10 text-white">
        React Column View
      </div>

      <div className="p-3 space-x-2">
        <Button
          onClick={() => {
            push('/basic');
          }}
        >
          Basic Example
        </Button>

        <Button
          onClick={() => {
            push('/with-initial-values');
          }}
        >
          Initial values Example
        </Button>

        <Button
          onClick={() => {
            push('/with-initial-values-and-path');
          }}
        >
          Initial values and path Example
        </Button>
      </div>
    </div>
  );
}

export default Index;
