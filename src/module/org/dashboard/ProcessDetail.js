/**
 * @file review status detail card
 * @author Mingze Ma
 */
import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useMemo, useState } from "react";
import actions from "../../../actions";
import Box from "@mui/material/Box";

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
    backgroundColor: theme.palette.error.lighter
  }), []);

  const DetailComponent = useMemo(() => ({
    0: <PreparingDetail />,
    1: <SubmittingDetail orgInfo={orgInfo} />,
  }), [orgInfo]);

  return (
    <Card sx={rootStyle}>
      {DetailComponent[process]}
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Process Detail
      </Typography>
    </Card>
  );
};
