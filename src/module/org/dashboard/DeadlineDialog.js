/**
 * @file dialog for setting deadline
 * @author Mingze Ma
 */

import React, { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import actions from "src/actions";
import { message } from "antd";
import { REVIEW_PROCESS } from "src/constants/constants";
import _ from "lodash";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import useFormValue from "src/hook/useFormValue";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const PROCESS_CONTENT = {
  0: {
    name: 'submission_ddl',
    label: 'Submission Deadline',
    nextStatus: 'collecting',
  },
  1: {
    name: 'bidding_ddl',
    label: 'Bidding Deadline',
    nextStatus: 'bidding',
  },
  2: {
    name: 'reviewing_ddl',
    label: 'Reviewing Deadline',
    nextStatus: 'reviewing',
  },
};

export default forwardRef((props, ref) => {
  const {
    orgInfo,
  } = props;
  const curProcess = _.get(orgInfo, 'review_process', 0);
  const curProcessContent = PROCESS_CONTENT[curProcess];

  const [deadline, handleDeadlineChange, deadlineProps] = useFormValue({ valueIndex: 0, initialValue: null });

  const [open, setOpen] = useState(false);

  const openDialog = useCallback(() => {
    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    try {
      const res = await actions.changeReviewProcess({
        org_id: orgInfo.id,
        [curProcessContent.name]: deadline,
      });
      message.success(
        `Forward reviewing process to ${REVIEW_PROCESS[_.get(res, 'current_review_process')]} successfully`
      );
      window.location.reload();
    } catch (e) {
      message.error(e.message);
    }
    // closeDialog();
  }, [curProcessContent.name, deadline, orgInfo.id]);

  useImperativeHandle(ref, () => ({
    openDialog,
    closeDialog,
  }));

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>Forward to {_.capitalize(curProcessContent.nextStatus)}</DialogTitle>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              You can set a deadline for the next stage in the paper review.
              Leave it blank if no deadline expected.<br/>
              The next stage is <b>{curProcessContent.nextStatus}</b>.
            </DialogContentText>
            <DateTimePicker
              disablePast
              label={curProcessContent.label}
              {...deadlineProps}
              renderInput={(params) => <TextField
                {...params}
                fullWidth
                variant="standard"
                autoFocus
              />}
            />
          </DialogContent>
          <DialogActions sx={{}}>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button type="submit">Confirm</Button>
          </DialogActions>
        </Box>
      </LocalizationProvider>

    </Dialog>
  );
})
