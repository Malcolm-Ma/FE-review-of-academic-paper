/**
 * @file user index
 * @author Mingze Ma
 */

import useOrgInfo from "src/hook/useOrgInfo";
import UserList from "src/component/UserList";
import Typography from "@mui/material/Typography";
import { Alert, Card } from "@mui/material";
import { useCallback, useMemo, useRef } from "react";
import AddMemberDialog from "src/component/AddMemberDialog";
import Button from "@mui/material/Button";
import * as React from "react";
import _ from "lodash";
import { useSelector } from "react-redux";

export default () => {
  const { orgInfo, OrgPage, OrgHeader } = useOrgInfo();
  const { userInfo } = useSelector(state => state.user);

  const addMemberRef = useRef();

  const handleAddMemberClick = useCallback(() => {
    addMemberRef && addMemberRef.current.openDialog();
  }, []);

  const isManager = useMemo(() => {
    const { manager_list: managers } = orgInfo;
    return _.some(managers, ({ id, type }) => id === userInfo.id && type >= 2);
  }, [orgInfo, userInfo]);

  const reviewStage = _.get(orgInfo, 'review_process', 0);
  return (
    <OrgPage maxWidth="xl">
      <OrgHeader
        action={
          <Button
            variant="contained"
            onClick={handleAddMemberClick}
            sx={{ display: { xs: 'none', md: 'flex' } }}
            disabled={reviewStage > 1}
          >
            Add Members
          </Button>
        }
      >
        <Typography variant="h4">Members of {orgInfo.name}</Typography>
      </OrgHeader>
      {(isManager && reviewStage > 1) && <Alert severity="warning" sx={{pb: 3}}>
        Members can not be added or changed roles after collecting, but can be blocked or unblocked
      </Alert>}
      <Card>
        <UserList />
      </Card>
      <AddMemberDialog ref={addMemberRef} orgInfo={orgInfo}/>
    </OrgPage>
  );
}
