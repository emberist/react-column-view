import { useColumnView } from '@emberist/react-column-view';
import { Fragment, useCallback } from 'react';
import { match } from 'ts-pattern';
import { ActionBar, Event } from '../ActionBar';
import { InitialState } from './default';
import { Row } from './Row';
import Section from './Section';

export type ColumnViewItem = {
  id?: string;
  name: string;
};

type Props = {
  initialState?: InitialState;
  initialPath?: string[];
};

const ColumnView = ({ initialState, initialPath }: Props) => {
  const [{ insert, root, path, select }] = useColumnView<ColumnViewItem>({
    initialState,
    path: initialPath,
  });

  const handleEvent = useCallback(
    (type: Event, value: string) => {
      match(type)
        .with('push', () => {
          insert(
            {
              name: value,
            },
            path[path.length - 1].id
          );
        })
        .with('pushToRoot', () => {
          insert({
            name: value,
          });
        })
        .with('select', () => {
          select(value);
        })
        .exhaustive();
    },
    [insert, path, select]
  );

  return (
    <>
      <ActionBar onEvent={handleEvent} />

      <div className="border-2 border-gray-300 rounded-md overflow-auto min-h-[400px] flex flex-col bg-white mt-2">
        <div className="flex flex-grow overflow-auto divide-x-2 ">
          <Section
            title="Section 1"
            onClick={() => insert({ name: 'Child ' + (root.length + 1) })}
          >
            {root.map(({ pushAt, id, isSelected, original: { name } }) => (
              <Row
                key={id}
                id={id}
                onClick={() => pushAt(0)}
                name={name}
                isSelected={isSelected}
              />
            ))}
          </Section>

          {path.map((item, sectionIndex) => (
            <Section
              key={sectionIndex}
              title={'Section ' + (sectionIndex + 2)}
              onClick={() => {
                insert(
                  { name: 'Child ' + (item.children.length + 1) },
                  item.id
                );
              }}
            >
              {item.children.map(
                ({ original: { name }, pushAt, id, isSelected }) => {
                  return (
                    <Row
                      key={id}
                      id={id}
                      onClick={() => pushAt(sectionIndex + 1)}
                      name={name}
                      isSelected={isSelected}
                    />
                  );
                }
              )}
            </Section>
          ))}
        </div>

        {Boolean(path.length) && (
          <div className="flex items-center border-t-2 border-gray-300 overflow-auto px-3 py-2">
            {path.map(({ original: { name }, id }, index) => (
              <Fragment key={id}>
                <div>{name}</div>

                {index < path.length - 1 && (
                  <div className={'font-bold px-3'}>/</div>
                )}
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ColumnView;
