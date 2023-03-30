import ColumnView from '../../components/ColumnView';
import { initialValues } from '../../components/ColumnView/default';
import { Example } from '../../components/Example';

export function WithInitialValues() {
  return (
    <Example>
      <ColumnView initialState={initialValues} />
    </Example>
  );
}

export default WithInitialValues;
