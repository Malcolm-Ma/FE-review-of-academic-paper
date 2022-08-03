/**
 * @file index actions
 * @author Mingze Ma
 */

import * as userActions from './userActions';
import * as orgActions from './orgActions';
import * as reviewActions from './reviewActions';

export default {
  ...userActions,
  ...orgActions,
  ...reviewActions,
};
