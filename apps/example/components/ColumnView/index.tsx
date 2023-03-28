import { useColumnView } from '@emberist/react-column-view';
import { Fragment, useState } from 'react';
import Button from '../Button';
import Section from '../Section';
import { InitialState } from './default';
import { Row } from './Row';

export type ColumnViewItem = {
  id?: string;
  name: string;
};

type Props = {
  initialState?: InitialState;
};

const ColumnView = ({ initialState }: Props) => {
  const [name, setName] = useState<string>();

  const { insert, root, path, selectNode } = useColumnView<ColumnViewItem>({
    initialState,
  });

  return (
    <div
      className={
        'border-2 border-gray-300 rounded-md overflow-auto min-h-[400px] flex flex-col bg-white'
      }
    >
      <div className={'flex p-2'}>
        <input
          type="text"
          placeholder="Name or id to select"
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
          className="px-3 mr-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-gray-300 outline-none focus:outline-none focus:ring "
        />

        <Button
          disabled={!name}
          onClick={() => {
            if (name) {
              insert({
                name: name || 'Unknown',
              });
              setName(undefined);
            }
          }}
        >
          Add in root
        </Button>

        <Button
          disabled={!name}
          onClick={() => {
            if (name) {
              selectNode(name);
              setName(undefined);
            }
          }}
        >
          Select
        </Button>

        <Button
          disabled={!name}
          onClick={() => {
            if (name) {
              insert(
                {
                  name: name || 'Unknown',
                },
                path.original[path.length - 1]
              );
              setName(undefined);
            }
          }}
        >
          Push to path
        </Button>
      </div>

      <div className="flex flex-grow overflow-auto divide-x-2 border-t-2 ">
        <Section
          title="Section 1"
          onClick={() => insert({ name: 'Child ' + (root.length + 1) })}
        >
          {root.map(({ name, pushAt, id, isSelected }) => (
            <Row
              key={id}
              id={id}
              onClick={() => pushAt(0)}
              name={name}
              isSelected={isSelected}
            />
          ))}
        </Section>

        {path.map((item, sectionIndex, original) => (
          <Section
            key={sectionIndex}
            title={'Section ' + (sectionIndex + 2)}
            onClick={() => {
              insert(
                { name: 'Child ' + (item.children().length + 1) },
                original[sectionIndex]
              );
            }}
          >
            {item.children().map(({ name, pushAt, id, isSelected }) => {
              return (
                <Row
                  key={id}
                  id={id}
                  onClick={() => pushAt(sectionIndex + 1)}
                  name={name}
                  isSelected={isSelected}
                />
              );
            })}
          </Section>
        ))}
      </div>

      <div className="flex border-t-2 border-gray-300">
        {path.map(({ name, id }, index) => (
          <Fragment key={id}>
            <div className={'px-5 py-2'}>{name}</div>
            {index < path.length - 1 && (
              <div className={'font-bold px-5 py-2'}>/</div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ColumnView;
