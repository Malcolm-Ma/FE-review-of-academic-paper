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
  const { orgInfo, OrgPage } = useOrgInfo();

  const reviewProcess = _.get(orgInfo, 'review_process', 0) === 3;
  return (
    <OrgPage>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Reviews of Submissions Assigned to Me
      </Typography>
      {!reviewProcess && <NotStartAlert processIndex={_.get(orgInfo, 'review_process', 0)}/>}
      <Paper>
        <ReviewTaskList reviewProcess={reviewProcess}/>
      </Paper>
    </OrgPage>
  );
};
