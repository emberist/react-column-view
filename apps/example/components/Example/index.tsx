import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import Button from '../Button';

export const Example = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  return (
    <div className="space-y-2 px-5  py-5">
      <Button onClick={() => router.back()}>Back</Button>

      <div>{children}</div>
    </div>
  );
};
