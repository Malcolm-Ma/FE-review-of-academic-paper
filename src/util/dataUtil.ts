/**
 * @file data utils for DataGrid
 * @author Mingze Ma
 */

import _ from 'lodash';

export const getRenderedData = (field: string) => {
  const valueGetter = ({row}: any) => _.get(row, field, '');
  return {
    field,
    valueGetter,
  };
};

export default {
  getRenderedData,
};
