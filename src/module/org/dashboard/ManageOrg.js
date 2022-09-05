/**
 * @file Manage org card
 * @author Mingze Ma
 */

import { Card, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useCallback, useRef } from "react";
import actions from "src/actions";
import { message } from "antd";
import { REVIEW_PROCESS } from "src/constants/constants";
import _ from "lodash";
import AllocateBiddingDialog from "src/module/org/dashboard/AllocateBiddingDialog";
import DeadlineDialog from "src/module/org/dashboard/DeadlineDialog";

export default (props) => {
  const { orgInfo } = props;
  const reviewProcess = _.get(orgInfo, 'review_process', 0);

  const makeBiddingRef = useRef(null);
  const changeProcessRef = useRef(null);


  const handleForwardProcess = useCallback(async () => {
    if (reviewProcess < 3) {
      changeProcessRef && changeProcessRef.current.openDialog();
      return;
    }
    try {
      const res = await actions.changeReviewProcess({ org_id: orgInfo.id });
      message.success(
        `Forward reviewing process to ${REVIEW_PROCESS[_.get(res, 'current_review_process')]} successfully`
      );
      window.location.reload();
    } catch (e) {
      message.error(e.message);
    }
  }, [orgInfo.id, reviewProcess]);

  const handleAllocateBidding = useCallback(() => {
    makeBiddingRef && makeBiddingRef.current.openDialog();
  }, []);

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5">Manage Organization</Typography>
          <Grid container sx={{ pt: 2 }}>
            <Grid item xs={6} sm={4} md={3} lg={2}>
              <Button
                variant="contained"
                onClick={handleForwardProcess}
                disabled={reviewProcess >= 4}
              >Forward Progress</Button>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2}>
              <Button
                variant="outlined" onClick={handleAllocateBidding}
                disabled={reviewProcess !== 2}
              >Allocate Bidding</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <AllocateBiddingDialog ref={makeBiddingRef} orgInfo={orgInfo} />
      {reviewProcess < 3 && <DeadlineDialog ref={changeProcessRef} orgInfo={orgInfo}/>}
    </>
  );
}
