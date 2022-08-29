/**
 * @file create a new review
 * @author Mingze Ma
 */

import useOrgInfo from "src/hook/useOrgInfo";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { message, Spin } from "antd";
import actions from "src/actions";
import _ from "lodash";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PaperDesc from "src/module/review/create/PaperDesc";
import EvaluationForm from "src/module/review/create/EvaluationForm";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";


export default (props) => {
  const { reviewId } = useParams();
  const navigate = useNavigate();

  const { orgInfo, OrgPage } = useOrgInfo();

  const { register, handleSubmit: handleSubmitHook, formState } = useForm();

  const [loading, setLoading] = useState(true);

  const [reviewInfo, setReviewInfo] = useState({});

  const handleBack = useCallback(() => {
    navigate(`/org/${orgInfo.id}/review_task`);
  }, [navigate, orgInfo]);

  const handleSubmit = async (values) => {
    console.log('--values--\n', values);
  };

  useEffect(() => {
    orgInfo.id && (async () => {
      setLoading(true);
      try {
        const res = await actions.getReviewTask({
          org_id: orgInfo.id,
          review_id: reviewId,
        });
        setReviewInfo(_.get(res, '0', {}));
      } catch (e) {
        message.error(e.message);
      }
      setLoading(false);
    })();
  }, [orgInfo, reviewId]);

  return (
    <OrgPage maxWidth="md">
      {
        !loading
          ? <Box>
          <Typography variant="h4">
            Create a New Review of <i>{_.get(reviewInfo, 'submission_info.title')}</i>
          </Typography>
          <Grid
            component="form"
            onSubmit={handleSubmitHook(handleSubmit)}
            container
            spacing={3}
            sx={{
              marginTop: 4,
            }}
          >
            <Grid item xs={12}>
              <PaperDesc submissionInfo={_.get(reviewInfo, 'submission_info')} />
            </Grid>
            <Grid item xs={12}>
              <EvaluationForm register={register} formState={formState} />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              display="flex"
            >
              <Button fullWidth variant="outlined" sx={{ mr: 2 }} onClick={handleBack}>Cancel</Button>
              <Button fullWidth type="submit" variant="contained">Submit</Button>
            </Grid>
          </Grid>
          </Box>
          : <Spin/>
      }
    </OrgPage>
  );
}
