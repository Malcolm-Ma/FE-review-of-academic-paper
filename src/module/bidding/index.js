/**
 * @file bidding system index
 * @author Mingze Ma
 */

import Typography from "@mui/material/Typography";
import useOrgInfo from "src/hook/useOrgInfo";
import _ from "lodash";

export default (props) => {
  const {} = props;

  const { orgInfo, OrgPage } = useOrgInfo();

  return (
    <OrgPage>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {_.get(orgInfo, 'name')} Paper Bidding
      </Typography>
    </OrgPage>
  );
}
