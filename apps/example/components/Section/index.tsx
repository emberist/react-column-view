import { PropsWithChildren } from 'react';
import Button from '../Button';

type Props = PropsWithChildren<{
  title: string;
  onClick: () => void;
}>;

const Section = ({ children, title, onClick }: Props) => {
  return (
    <div className="min-w-[250px] sm:w-52 border-gray-300">
      <div className="p-2 bg-gray-100 items-center flex justify-between border-b-2 border-gray-300">
        <div className="font-medium">{title}</div>

        <Button onClick={onClick}>Add</Button>
      </div>

      <div className="overflow-auto divide-y-2">{children}</div>
    </div>
  );
};

export default Section;
