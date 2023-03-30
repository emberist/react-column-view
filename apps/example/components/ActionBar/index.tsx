import { useCallback, useState } from 'react';
import Button from '../Button';

export type Event = 'push' | 'pushToRoot' | 'select';

type Props = {
  onEvent: (type: Event, value: string) => void;
};

export const ActionBar = ({ onEvent }: Props) => {
  const [value, setValue] = useState('');

  const handleEvent = useCallback(
    (type: Event) => {
      if (!value) {
        return;
      }

      onEvent(type, value);

      setValue('');
    },
    [onEvent, value]
  );

  return (
    <>
      <div className="flex md:items-center space-y-2 md:space-y-0 md:space-x-2 flex-col md:flex-row p-2 border-2 border-gray-300 rounded-md bg-white">
        <input
          type="text"
          placeholder="Name or id to select"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="px-3 py-2 md:mr-2 text-blueGray-600 relative bg-white rounded text-sm border border-gray-300 outline-none focus:outline-none focus:ring "
        />

        <Button disabled={!value} onClick={() => handleEvent('pushToRoot')}>
          Add in root
        </Button>

        <Button disabled={!value} onClick={() => handleEvent('select')}>
          Select
        </Button>

        <Button disabled={!value} onClick={() => handleEvent('push')}>
          Push to path
        </Button>
      </div>
    </>
  );
};
