/**
 * @file Manage org card
 * @author Mingze Ma
 */

import { Card, CardContent, Switch } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useCallback, useRef, useState } from "react";
import actions from "src/actions";
import { message } from "antd";
import { REVIEW_PROCESS } from "src/constants/constants";
import _ from "lodash";
import AllocateBiddingDialog from "src/module/org/dashboard/AllocateBiddingDialog";
import DeadlineDialog from "src/module/org/dashboard/DeadlineDialog";
import FormControlLabel from "@mui/material/FormControlLabel";
import BlindConfirmDialog from "src/module/org/dashboard/BlindConfirmDialog";
import AddMemberDialog from "src/component/AddMemberDialog";
import { useNavigate } from "react-router-dom";

export default (props) => {
  const { orgInfo } = props;

  const navigate = useNavigate();

  const reviewProcess = _.get(orgInfo, 'review_process', 0);

  const makeBiddingRef = useRef(null);
  const changeProcessRef = useRef(null);
  const blindModeRef = useRef(null);
  const addMemberRef = useRef(null);

  const [blindMode, setBlindMode] = useState(_.get(orgInfo, 'blind_mode', false));

  const handleForwardProcess = useCallback(async () => {
    if (reviewProcess < 3) {
      changeProcessRef && changeProcessRef.current.openDialog();
      return;
    }
    try {
      const res = await actions.generateReviewingResult({ org_id: orgInfo.id });
      message.success(
        `You have successfully generated decisions for all submissions, the review flow is over`
      );
      setTimeout(() => window.location.reload(), 2000);
    } catch (e) {
      message.error(e.message);
    }
  }, [orgInfo.id, reviewProcess]);

  const handleBlindModeChange = useCallback(() => {
    blindModeRef && blindModeRef.current.openDialog();
  }, []);

  const handleAllocateBidding = useCallback(() => {
    makeBiddingRef && makeBiddingRef.current.openDialog();
  }, []);

  const handleAddMemberClick = useCallback(() => {
    addMemberRef && addMemberRef.current.openDialog();
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Main Control</Typography>
              <Grid container sx={{ pt: 2 }}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    onClick={handleForwardProcess}
                    disabled={reviewProcess >= 4}
                  >
                    {reviewProcess < 3 ? 'Forward Progress' : 'Generate Decision'}
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={<Switch
                      checked={blindMode}
                      onChange={handleBlindModeChange}
                      disabled={reviewProcess === 4}
                    />}
                    label={<Typography variant="subtitle1" sx={{ opacity: 0.8 }}>Double-blind</Typography>}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Bidding Control</Typography>
              <Grid container sx={{ pt: 2 }}>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    onClick={handleAllocateBidding}
                    disabled={reviewProcess !== 2}
                  >Allocate Bidding</Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="text"
                    onClick={() => window.open(`/org/${orgInfo.id}/bidding/result`)}
                    disabled={reviewProcess < 2}
                  >Bidding Result</Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Member Management</Typography>
              <Grid container sx={{ pt: 2 }}>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    onClick={handleAddMemberClick}
                    disabled={reviewProcess > 1}
                  >Add Members</Button>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Button
                    variant="text"
                    onClick={() => navigate(`/org/${orgInfo.id}/user`)}
                  >Member List</Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <AllocateBiddingDialog ref={makeBiddingRef} orgInfo={orgInfo}/>
      {reviewProcess < 3 && <DeadlineDialog ref={changeProcessRef} orgInfo={orgInfo}/>}
      <BlindConfirmDialog
        blindMode={blindMode}
        ref={blindModeRef}
        onSubmit={() => setBlindMode(!blindMode)}
        orgInfo={orgInfo}
      />
      <AddMemberDialog ref={addMemberRef} orgInfo={orgInfo}/>
    </>
  );
}
