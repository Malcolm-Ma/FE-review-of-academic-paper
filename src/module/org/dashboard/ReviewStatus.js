/**
 * @file review status card
 * @author Mingze Ma
 */
import { Card, CardContent, CardHeader } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useCallback, useMemo } from "react";
import { REVIEW_PROCESS } from "../../../constants/constants";

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
    color: theme.palette.warning.darker,
    backgroundColor: theme.palette.warning.lighter
  }), []);

  return (
    <Card sx={rootStyle}>
      <Typography variant="h3">{REVIEW_PROCESS[process]}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Reviewing Process
      </Typography>
    </Card>
  );
};
