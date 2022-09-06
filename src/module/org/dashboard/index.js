/**
 * @file org dashboard
 * @author Mingze Ma
 */

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";
import Grid from "@mui/material/Grid";
import SubmissionCard from "./SubmissionCard";
import InfoDisplay from "./InfoDisplay";
import ReviewStatus from "./ReviewStatus";
import ProcessDetail from "./ProcessDetail";
import useOrgInfo from "src/hook/useOrgInfo";
import ManageOrg from "src/module/org/dashboard/ManageOrg";
import UserListCard from "src/module/org/dashboard/UserListCard";

export default (props) => {
  const { orgInfo, OrgPage } = useOrgInfo();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.user);

  const isAdmin = _.some(_.get(orgInfo, 'manager_list', []), ({ id }) => id === userInfo.id);
  const doubleBlind = _.get(orgInfo, 'blind_mode', false);

  return (
    <OrgPage maxWidth="lg">
      <Box sx={{ pb: 5 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Welcome back, {_.get(userInfo, 'title', '')} {_.get(userInfo, 'full_name', '')}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <InfoDisplay orgInfo={orgInfo}/>
          </Grid>
          <Grid item xs={6} md={3} lg={2}>
            <ReviewStatus orgInfo={orgInfo}/>
          </Grid>
          <Grid item xs={6} md={3} lg={2}>
            <ProcessDetail orgInfo={orgInfo}/>
          </Grid>
          {isAdmin && <Grid item xs={12}>
            <ManageOrg orgInfo={orgInfo}/>
          </Grid>}
          <Grid item xs={12}>
            <SubmissionCard orgInfo={orgInfo}/>
          </Grid>
          {!doubleBlind && <Grid item xs={12}>
            <UserListCard orgInfo={orgInfo}/>
          </Grid>}
        </Grid>
      </Box>
    </OrgPage>
  );
};
