/**
 * @file org dashboard
 * @author Mingze Ma
 */

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "src/actions";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "src/component/Loading";
import { Alert, Card, CardContent, CardHeader } from "@mui/material";
import _ from "lodash";
import Grid from "@mui/material/Grid";
import SubmissionList from "src/component/SubmissionList";
import Button from "@mui/material/Button";
import SubmissionCard from "./SubmissionCard";
import InfoDisplay from "./InfoDisplay";
import ReviewStatus from "./ReviewStatus";
import ProcessDetail from "./ProcessDetail";
import useOrgInfo from "src/hook/useOrgInfo";

export default (props) => {
  const { orgInfo, OrgPage } = useOrgInfo();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.user);

  return (
    <OrgPage maxWidth="lg">
      <Box sx={{ pb: 5 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Welcome back, {_.get(userInfo, 'title', '')} {_.get(userInfo, 'full_name', '')}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <InfoDisplay orgInfo={orgInfo} />
          </Grid>
          <Grid item xs={3}>
            <ReviewStatus orgInfo={orgInfo} />
          </Grid>
          <Grid item xs={3}>
            <ProcessDetail orgInfo={orgInfo} />
          </Grid>
          <Grid item xs={12}>
            <SubmissionCard orgInfo={orgInfo} />
          </Grid>
        </Grid>
      </Box>
    </OrgPage>
  );
};
