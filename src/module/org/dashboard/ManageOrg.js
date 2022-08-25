/**
 * @file Manage org card
 * @author Mingze Ma
 */

import { Card, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useCallback } from "react";
import actions from "src/actions";
import { message } from "antd";
import { REVIEW_PROCESS } from "src/constants/constants";
import _ from "lodash";

export default (props) => {
  const { orgInfo } = props;

  const handleForwardProcess = useCallback(async () => {
    try {
      const res = await actions.changeReviewProcess({ org_id: orgInfo.id });
      message.success(
        `Forward reviewing process to ${REVIEW_PROCESS[_.get(res, 'current_review_process')]} successfully`
      );
      window.location.reload();
    } catch (e) {
      message.error(e.message);
    }
  }, [orgInfo]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Manage Organization</Typography>
        <Grid container sx={{ pt: 2 }}>
          <Grid item xs={6} sm={4} md={3}>
            <Button variant="contained" onClick={handleForwardProcess}>Forward Progress</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
