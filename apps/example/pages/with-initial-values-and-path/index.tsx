import ColumnView from '../../components/ColumnView';
import {
  initialPath,
  initialValues,
} from '../../components/ColumnView/default';
import { Example } from '../../components/Example';

export function WithInitialValues() {
  return (
    <Example>
      <ColumnView initialState={initialValues} initialPath={initialPath} />
    </Example>
  );
}

export default WithInitialValues;
