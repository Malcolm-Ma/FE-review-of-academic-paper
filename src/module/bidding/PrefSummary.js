/**
 * @file preference summary
 * @author Mingze Ma
 */

import Typography from "@mui/material/Typography";
import { Progress, Table } from "antd";
import { Card, CardContent } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import _ from "lodash";
import actions from "src/actions";
import useOrgInfo from "src/hook/useOrgInfo";
import { useDispatch, useSelector } from "react-redux";
import { resetFlag } from "src/reducer/reviewReducer";
import Grid from "@mui/material/Grid";

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

  const percent = useMemo(() => {
    if (summary.total === 0) {
      return 0;
    }
    return _.round(((summary.total - _.get(summary, 'unsigned', 0)) * 100) / summary.total)
  }, [summary]);

  useEffect(() => {
    (!_.isEmpty(orgInfo) && !_.isEmpty(userInfo)) && fetchSummaryData();
    return () => setSummary({});
  }, [fetchSummaryData, orgInfo, userInfo]);

  useEffect(() => {
    if (summaryShouldUpdate) {
      fetchSummaryData();
      dispatch(resetFlag());
    }
  }, [dispatch, fetchSummaryData, summaryShouldUpdate]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <Card sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CardContent>
            {!_.isEmpty(summary) && <Progress type="circle" percent={percent}/>}
            <Typography
              variant="h6"
              align="center"
              sx={{ pt: 1 }}
            >
              {summary.total - summary.unsigned} / {summary.total}
            </Typography>
            <Typography variant="subtitle2" sx={{ pt: 1 }}>Bidding Progress</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={9}>
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
      </Grid>
    </Grid>
  );
};
