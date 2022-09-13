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

  const formRef = useRef(null);

  const [loading, setLoading] = useState(true);

  const [reviewInfo, setReviewInfo] = useState({});

  const handleBack = useCallback(() => {
    navigate(`/org/${orgInfo.id}/review_task/${reviewId}/detail`);
  }, [navigate, orgInfo.id, reviewId]);

  const handleSubmit = useCallback(async () => {
    const values = formRef.current || {};
    console.log('--values--\n', values);
    const confidence = _.get(values, 'confidence');
    const overallEvaluation = _.get(values, 'score');
    const asShortPaper = _.get(values, 'asShortPaper');
    // Check param
    if (!confidence) {
      message.warn('Reviewer\'s Confidence must not be null');
      return;
    }
    if (!overallEvaluation) {
      message.warn('Please select an overall evaluation score');
      return;
    }
    if (!values.evaluationContent) {
      message.warn('Review text must not be empty');
      return;
    }
    // submit reviews
    try {
      const res = await actions.createNewReview({
        confidence,
        overall_evaluation: overallEvaluation,
        evaluation_content: values.evaluationContent,
        as_short_paper: asShortPaper ? 1 : 0,
        review_id: reviewId,
        confidence_remark: values.remarks,
      });
      message.success('Your review has been submitted successfully');
      handleBack();
    } catch (e) {
      console.error(e.message);
    }
  }, [handleBack, reviewId]);

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
            container
            spacing={3}
            sx={{
              marginTop: 4,
            }}
          >
            <Grid item xs={12}>
              <PaperDesc submissionInfo={_.get(reviewInfo, 'submission_info', {})} />
            </Grid>
            <Grid item xs={12}>
              <EvaluationForm ref={formRef} />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              display="flex"
            >
              <Button fullWidth variant="outlined" sx={{ mr: 2 }} onClick={handleBack}>Cancel</Button>
              <Button fullWidth variant="contained" onClick={handleSubmit}>Submit</Button>
            </Grid>
          </Grid>
          </Box>
          : <Spin/>
      }
    </OrgPage>
  );
}
