/**
 * @file list of submission index
 * @author Mingze Ma
 */

import Container from "@mui/material/Container";
import SubmissionList from "src/component/SubmissionList";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import useOrgInfo from "src/hook/useOrgInfo";
import { Tag } from "antd";
import Button from "@mui/material/Button";
import * as React from "react";
import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default (props) => {
  const navigate = useNavigate();
  const { orgInfo, OrgPage, OrgHeader } = useOrgInfo();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCreateSubmissionNavigate = useCallback(() => {
    const orgId = _.get(orgInfo, 'id', null);
    if (orgId) {
      navigate(`/org/${orgId}/submissions/create`);
      return;
    }
    navigate(`/submission/create`);
  }, [navigate, orgInfo]);

  const processIndex = _.get(orgInfo, 'review_process', 0);
  return (
    <OrgPage maxWidth="xl">
      <OrgHeader action={
        <Button
          variant="contained"
          onClick={handleCreateSubmissionNavigate}
          sx={{ display: { xs: 'none', md: 'flex' } }}
          disabled={processIndex > 1}
        >
          New Submission
        </Button>
      }>
        <Typography variant="h4">
          {searchParams.get('scope') !== 'my' ? 'List of Submissions' : 'My Submissions'} in <i>{orgInfo.name}</i>
        </Typography>
      </OrgHeader>
      <Paper>
        <SubmissionList fullHeight={true} scope={searchParams.get('scope')} />
      </Paper>
    </OrgPage>
  );
};
