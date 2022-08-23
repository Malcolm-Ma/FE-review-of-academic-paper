/**
 * @file preference summary
 * @author Mingze Ma
 */

import Typography from "@mui/material/Typography";
import { Table } from "antd";
import { Card } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import _ from "lodash";
import actions from "src/actions";
import useOrgInfo from "src/hook/useOrgInfo";
import { useDispatch, useSelector } from "react-redux";
import { resetFlag } from "src/reducer/reviewReducer";

const summaryTableConfig = [
  {
    title: 'Choice',
    dataIndex: 'choice',
    render: (text) => <strong>{text}</strong>
  },
  {
    title: 'Explanation',
    dataIndex: 'explanation',
    // width: 250,
  },
  {
    title: 'Papers',
    dataIndex: 'papers',
  },
];

export default (props) => {
  const { orgInfo } = props;

  const [summary, setSummary] = useState({});

  const dispatch = useDispatch();
  const { summaryShouldUpdate } = useSelector(state => state.review.bidding);
  const { userInfo } = useSelector(state => state.user);

  const fetchSummaryData = useCallback(async () => {
    try {
      const res = await actions.getBiddingPrefSummary({
        org_id: orgInfo.id,
        user_id: userInfo.id,
      });
      setSummary(res);
    } catch (e) {
      console.error(e.message);
    }
  }, [orgInfo, userInfo]);

  const summaryData = useMemo(() => {
    if (_.isEmpty(summary)) {
      return [];
    }
    const { interest, maybe, no, conflict } = summary;
    return [
      {
        choice: 'Yes',
        explanation: 'I want to review this paper',
        papers: interest,
      },
      {
        choice: 'Maybe',
        explanation: 'I can review it',
        papers: maybe,
      },
      {
        choice: 'No',
        explanation: 'I prefer not to review it',
        papers: no,
      },
      {
        choice: 'Conflict',
        explanation: 'I have a conflict of interests',
        papers: conflict,
      }
    ];
  }, [summary]);

  useEffect(() => {
    !_.isEmpty(orgInfo) && fetchSummaryData();
  }, [fetchSummaryData, orgInfo]);

  useEffect(() => {
    if (summaryShouldUpdate) {
      fetchSummaryData();
      dispatch(resetFlag());
    }
  }, [dispatch, fetchSummaryData, summaryShouldUpdate]);

  return (
    <Card>
      <Typography variant="h6" sx={{ p: 2 }}>Bidding Summary</Typography>
      <Table
        dataSource={summaryData}
        columns={summaryTableConfig}
        rowKey={record => record.choice}
        size="small"
        pagination={false}
      />
    </Card>
  );
};
