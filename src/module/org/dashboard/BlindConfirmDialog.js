/**
 * @file blind mode confirm dialog
 * @author Mingze Ma
 */

import React, { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import _ from "lodash";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import actions from "src/actions";
import { message } from "antd";

export default forwardRef((props, ref) => {
  const {
    orgInfo,
    blindMode,
    onSubmit
  } = props;
  const [open, setOpen] = useState(false);

  const openDialog = useCallback(() => {
    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSubmit = useCallback(async () => {
    onSubmit && onSubmit();
    try {
      const res = await actions.setBlindMode({
        org_id: orgInfo.id,
        status: !blindMode,
      });
      message.success(`Turn ${!blindMode ? 'on' : 'off'} the double-blind mode successfully`);
      closeDialog();
    } catch (e) {
      message.error(e.message);
      console.error(e.message);
    }
  }, [blindMode, closeDialog, onSubmit, orgInfo.id]);

  useImperativeHandle(ref, () => ({
    openDialog,
    closeDialog
  }));

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>Change Blind Mode</DialogTitle>
      <Box component="div">
        <DialogContent>
          <DialogContentText>
            Are you sure you will turn {!blindMode ? 'on' : 'off'} blind mode?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{}}>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>Confirm</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
});
