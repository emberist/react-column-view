import ColumnView from '../../components/ColumnView';
import { initialValues } from '../../components/ColumnView/default';

export function WithInitialValues() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return <ColumnView initialState={initialValues} />;
}

export default WithInitialValues;
