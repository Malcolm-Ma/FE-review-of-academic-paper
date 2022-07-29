/**
 * @file index actions
 * @author Mingze Ma
 */

import * as userActions from './userActions';
import * as orgActions from './orgActions';

export default {
  ...userActions,
  ...orgActions,
};
