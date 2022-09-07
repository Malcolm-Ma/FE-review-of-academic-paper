/**
 * @file review status detail card
 * @author Mingze Ma
 */
import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useMemo, useState } from "react";
import actions from "../../../actions";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import _ from "lodash";
import moment from "moment";
import { DATETIME_FORMAT } from "src/constants/constants";

const PreparingDetail = () => (
  <>
    <Typography variant="body1">Manager is preparing for this conference...</Typography>
  </>
);

const SubmittingDetail = ({ orgInfo }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await actions.getSubmissionCount({ org_id: orgInfo.id });
        setCount(res.count);
      } catch (e) {
        console.error(e.message);
      }
    })();
    return () => setCount(0);
  }, [orgInfo]);

  return (
    <Box>
      <Typography variant="h3">{count}</Typography>
      <Typography variant="body1">Submissions</Typography>
    </Box>
  );
};

const BiddingDetail = ({ orgInfo }) => {
  const { userInfo } = useSelector(state => state.user);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    !_.isEmpty(userInfo) && (async () => {
      try {
        const res = await actions.getBiddingPrefSummary({
          org_id: orgInfo.id,
          user_id: userInfo.id,
        });
        setSummary(res);
      } catch (e) {
        console.error(e.message);
      }
    })();
    return () => setSummary({});
  }, [orgInfo, userInfo]);

  const biddingDdl = useMemo(() => {
    if (_.get(orgInfo, 'bidding_ddl')) {
      return moment(_.get(orgInfo, 'bidding_ddl')).format(DATETIME_FORMAT);
    }
    return 'Unset';
  }, [orgInfo]);
  return (
    <>
      {!_.isEmpty(userInfo) && <Typography
        variant="h6"
        align="center"
      >
        {summary.total - summary.unsigned} / {summary.total}
      </Typography>}
      <Typography variant="subtitle1">DDL {biddingDdl}</Typography>
    </>
  );
}

const ReviewingDetail = ({ orgInfo }) => {
  const reviewingDdl = useMemo(() => {
    if (_.get(orgInfo, 'review_ddl')) {
      return moment(_.get(orgInfo, 'review_ddl')).format(DATETIME_FORMAT);
    }
    return 'Unset';
  }, [orgInfo]);

  return (
    <Box>
      <Typography variant="subtitle1">DDL {reviewingDdl}</Typography>
    </Box>
  );
};

const DETAIL_MAP = {
  0: PreparingDetail,
  1: SubmittingDetail,
  2: BiddingDetail,
  3: ReviewingDetail,
};

export default (props) => {
  const { orgInfo } = props;
  const {
    review_process: process
  } = orgInfo;

  const rootStyle = useCallback((theme) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: theme.palette.error.darker,
    backgroundColor: theme.palette.error.lighter,
    padding: 2,
  }), []);

  const DetailComponent = useMemo(() => {
    const Component = DETAIL_MAP[process];
    if (Component) {
      return Component;
    }
    return () => <></>;
  }, [process]);

  return (
    <Card sx={rootStyle}>
      <DetailComponent orgInfo={orgInfo} />
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Process Detail
      </Typography>
    </Card>
  );
};
