/**
 * @file review index
 * @author Mingze Ma
 */

import useOrgInfo from "src/hook/useOrgInfo";
import _ from "lodash";
import Typography from "@mui/material/Typography";
import ReviewTaskList from "src/component/ReviewTaskList";
import Paper from "@mui/material/Paper";

export default () => {
  const { orgInfo, OrgPage } = useOrgInfo();

  return (
    <OrgPage>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Reviews of Submissions Assigned to Me
      </Typography>
      <Paper>
        <ReviewTaskList />
      </Paper>
    </OrgPage>
  );
};
