/**
 * @file evaluation form
 * @author Mingze Ma
 */
import {
  Card,
  Divider,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup
} from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { CONFIDENCE, OVERALL_EVALUATION } from "src/constants/evaluation";
import _ from "lodash";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";

export default (props) => {
  const {
    register,
    formState: { errors }
  } = props;

  return (
    <Card>
      <Grid
        container
        spacing={1}
        sx={{ p: 3 }}
      >
        <Grid item xs={12}>
          <FormControl>
            <FormLabel required={true}>Overall Evaluation</FormLabel>
            <Typography variant="body2" color="grey.600" sx={{ pb: 1, pt: 2 }}>
              Please provide a detailed review, including a justification for your scores.
              Both the score and the review text are required.
            </Typography>
            <RadioGroup
              {...register('overall_evaluation')}
            >
              {_.map(OVERALL_EVALUATION, ({ label, value }) => (
                <FormControlLabel
                  key={value}
                  value={value}
                  control={<Radio/>}
                  label={`${value}: ${label}`}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('evaluation_content', { required: true })}
            required
            multiline
            fullWidth
            minRows={4}
            label="Review Text"
            error={!!errors.evaluation_content}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 3, mb: 2 }}><Divider/></Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel required={true}>Reviewer's Confidence</FormLabel>
            <RadioGroup
              {...register('confidence')}
            >
              {_.map(CONFIDENCE, ({ label, value }) => (
                <FormControlLabel
                  key={value}
                  value={value}
                  control={<Radio/>}
                  label={`${value}: (${label})`}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="grey.600">Confidential remarks for the program committee</Typography>
          <Typography variant="body2" color="grey.600">
            If you wish to add any remarks intended only for committee members, please write then below.
            These remarks will only be seen by the members having access to reviews for this submission.
            They will not be sent to authors. This field is optional.
          </Typography>
          <TextField
            sx={{ mt: 2 }}
            {...register('confidence_remark')}
            multiline
            fullWidth
            minRows={4}
            label="Confidential Remarks"
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography variant="body1" color="grey.600" sx={{ mb: 1 }}>Accept as a short paper</Typography>
          <Typography variant="body2" color="grey.600">
            Short papers are limited to 2 pages.
            A longer paper than this, which is rejected as a full 10 page paper can,
            nevertheless, be accepted as a short paper, which will be limited to 2 pages in the proceedings.
          </Typography>
          <FormControlLabel
            control={<Checkbox {...register('as_short_paper')} />}
            sx={{ color: 'grey.600' }}
            label="Recommended acceptance as a short paper"
          />
        </Grid>
      </Grid>
    </Card>
  );
}
