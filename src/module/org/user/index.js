/**
 * @file user index
 * @author Mingze Ma
 */

import useOrgInfo from "src/hook/useOrgInfo";
import UserList from "src/component/UserList";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import { useCallback, useRef } from "react";
import AddMemberDialog from "src/component/AddMemberDialog";
import Button from "@mui/material/Button";
import * as React from "react";

export default () => {
  const { orgInfo, OrgPage, OrgHeader } = useOrgInfo();

  const addMemberRef = useRef();

  const handleAddMemberClick = useCallback(() => {
    addMemberRef && addMemberRef.current.openDialog();
  }, []);

  return (
    <OrgPage maxWidth="xl">
      <OrgHeader
        action={
          <Button
            variant="contained"
            onClick={handleAddMemberClick}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            Add Members
          </Button>
        }
      >
        <Typography variant="h4">Members of {orgInfo.name}</Typography>
      </OrgHeader>
      <Card>
        <UserList />
      </Card>
      <AddMemberDialog ref={addMemberRef} orgInfo={orgInfo}/>
    </OrgPage>
  );
}
