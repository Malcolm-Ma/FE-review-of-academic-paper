/**
 * @file review index
 * @author Mingze Ma
 */

import useOrgInfo from "src/hook/useOrgInfo";
import _ from "lodash";
import Typography from "@mui/material/Typography";
import ReviewTaskList from "src/component/ReviewTaskList";
import Paper from "@mui/material/Paper";
import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import { Tag } from "antd";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const NotStartAlert = ({ processIndex }) => {
  const alertText = (() => {
    if (processIndex < 3) {
      return 'The organization is not ready for reviewing papers. Please come back later'
    }
    if (processIndex > 3) {
      return 'Paper reviewing is over'
    }
  })();

  return (
    <>
      <Alert severity="warning" sx={{ mb: 3 }}>
        <Typography variant="subtitle1">{alertText}</Typography>
      </Alert>
    </>
  )
};

export default () => {
  const { userInfo } = useSelector(state => state.user);
  const { orgInfo, OrgPage, OrgHeader } = useOrgInfo();

  const isAdmin = useMemo(() => {
    const { manager_list: managers } = orgInfo;
    return _.some(managers, ({ id }) => id === userInfo.id);
  }, [orgInfo, userInfo]);

  const reviewProcess = _.get(orgInfo, 'review_process', 0) === 3;
  const processIndex = _.get(orgInfo, 'review_process', 0);
  const blindMode = _.get(orgInfo, 'blind_mode', false);
  return (
    <OrgPage>
      <OrgHeader action={blindMode && <Tag color="volcano">Double-blind Mode</Tag>}>
        <Typography variant="h4">
          Reviews of Submissions Assigned to Me
        </Typography>
      </OrgHeader>
      {!reviewProcess && <NotStartAlert processIndex={processIndex}/>}
      <Paper>
        <ReviewTaskList adminView={isAdmin} reviewProcess={reviewProcess} processIndex={processIndex}/>
      </Paper>
    </OrgPage>
  );
};
