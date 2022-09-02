/**
 * @file allocate bidding dialog
 * @author Mingze Ma
 */

import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import actions from "src/actions";

export default forwardRef((props, ref) => {
  const {
    orgInfo,
  } = props;

  const [open, setOpen] = useState(false);

  const openDialog = useCallback(() => {
    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log('--data--\n', {
      review_demand: data.get('review_demand'),
    });
    try {
      const res = await actions.allocateBidding({
        review_demand: data.get('review_demand'),
        min_task_per_user: data.get('min_task_per_user'),
        org_id: orgInfo.id,
      });
    } catch (e) {
      console.error(e.message);
    }
    // closeDialog();
  }, []);

  useImperativeHandle(ref, () => ({
    openDialog,
    closeDialog,
  }));

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>Allocate Bidding</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <Typography variant="body1" sx={{ pb: 1 }}>
            To start allocating bidding of the paper,
            please enter the demands of reviewers per paper and the expected minimum task numbers per reviewer.
          </Typography>
          <DialogContentText>
            Please note that, the minimum number of assignments per reviewer (optional) cannot be more than:<br/>
            (total_number_of_submissions * demand_number_of_reviews_per_paper) / total_number_of_reviewers
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            name="review_demand"
            label="Review Demand"
            fullWidth
            type="number"
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            name="min_task_per_user"
            label="Min Task per Reviewer"
            fullWidth
            variant="standard"
            placeholder="Min Task per Reviewer(Optional)"
          />
        </DialogContent>
        <DialogActions sx={{}}>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button type="submit">Confirm</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
})
