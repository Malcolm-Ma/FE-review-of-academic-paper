/**
 * @file add member dialog
 * @author Mingze Ma
 */

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import _ from "lodash";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import SearchUser from "src/component/SearchUser";
import actions from "src/actions";
import { message } from "antd";
import { REVIEW_PROCESS } from "src/constants/constants";

export default forwardRef((props, ref) => {
  const { orgInfo } = props;
  const [open, setOpen] = useState(false);

  const [userList, setUserList] = useState([]);

  const openDialog = useCallback(() => {
    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      const res = await actions.addMembers({
        org_id: orgInfo.id,
        user_type: 'MEMBER',
        index_type: 'id',
        index_list: _.map(userList, 'id'),
      });
      message.success(
        `Forward reviewing process to ${REVIEW_PROCESS[_.get(res, 'current_review_process')]} successfully`
      );
      window.location.reload();
    } catch (e) {
      message.error(e.message);
    }
    closeDialog();
  }, [closeDialog, orgInfo.id, userList]);

  useImperativeHandle(ref, () => ({
    openDialog,
    closeDialog,
  }));

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>Add Members</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ pb: 2 }}>
          Add member to this organization by searching users below
        </DialogContentText>
        <SearchUser
          label="Add Users"
          value={userList}
          onChange={(val) => setUserList(val)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button type="submit" onClick={handleSubmit}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
});
