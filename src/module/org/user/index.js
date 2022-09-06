/**
 * @file user index
 * @author Mingze Ma
 */

import useOrgInfo from "src/hook/useOrgInfo";
import UserList from "src/component/UserList";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";

export default () => {
  const { orgInfo, OrgPage, OrgHeader } = useOrgInfo();

  return (
    <OrgPage maxWidth="xl">
      <OrgHeader>
        <Typography variant="h4">Members of {orgInfo.name}</Typography>
      </OrgHeader>
      <Card>
        <UserList />
      </Card>
    </OrgPage>
  );
}
