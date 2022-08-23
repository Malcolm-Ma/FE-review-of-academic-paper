/**
 * @file bidding choice btn group
 * @author Mingze Ma
 */

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useCallback, useState } from "react";
import actions from "src/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import _ from "lodash";
import { message } from "antd";
import { notifyUpdate } from "src/reducer/reviewReducer";

export default (props) => {
  const { submissionId, value = '' } = props;

  const [pref, setPref] = useState(value);

  const { orgId } = useParams();

  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.user);

  const handleAlignment = useCallback(async (event, val) => {
    setPref(val);
    try {
      const res = await actions.setBiddingPref({
        org_id: orgId,
        user_id: _.get(userInfo, 'id'),
        submission_id: submissionId,
        bidding_pref: val,
      });
      dispatch(notifyUpdate());
      message.success('Successfully bid interest');
    } catch (e) {
      console.error(e.message);
    }
  }, [dispatch, orgId, submissionId, userInfo]);

  return (
    <ToggleButtonGroup
      value={pref}
      exclusive
      onChange={handleAlignment}
      size="small"
    >
      <ToggleButton value="YES">
        Yes
      </ToggleButton>
      <ToggleButton value="MAYBE">
        Maybe
      </ToggleButton>
      <ToggleButton value="NO">
        No
      </ToggleButton>
      <ToggleButton value="CONFLICT">
        Conflict
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
