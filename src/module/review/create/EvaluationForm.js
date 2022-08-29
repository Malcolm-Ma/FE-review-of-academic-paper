/**
 * @file evaluation form
 * @author Mingze Ma
 */
import {
  Card,
  CardContent,
  Divider,
  FormControl, FormHelperText,
  FormLabel,
  Input,
  InputLabel, OutlinedInput,
  Radio,
  RadioGroup
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { CONFIDENCE, OVERALL_EVALUATION } from "src/constants/evaluation";
import _ from "lodash";
import Typography from "@mui/material/Typography";

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
        sx={{p: 3}}
      >
        <Grid item xs={12}>
          <FormControl>
            <FormLabel required={true}>Overall Evaluation</FormLabel>
            <Typography variant="body2" color="grey.600" sx={{ pb: 1, pt: 2 }}>
              Please provide a detailed review, including a justification for your scores.
              Both the score and the review text are required.
            </Typography>
            <RadioGroup
              {...register('overall_evaluation', { required: true })}
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
        <Grid item xs={12} sx={{ mt: 3, mb: 2 }}><Divider /></Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel required={true}>Reviewer's Confidence</FormLabel>
            <RadioGroup
              {...register('confidence', { required: true })}
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
          <Typography variant="subtitle1" color="grey.600" sx={{ opacity: 0.72 }}>Confidential remarks for the program committee</Typography>
          <Typography variant="body2" color="grey.600">
            If you wish to add any remarks intended only for committee members, please write then below.
            These remarks will only be seen by the members having access to reviews for this submission.
            They will not be sent to authors. This field is optional.
          </Typography>
          <TextField
            sx={{mt: 2}}
            {...register('confidence_remark')}
            multiline
            fullWidth
            minRows={4}
            label="Confidential Remarks"
            error={!!errors.confidence_remark}
          />
        </Grid>
      </Grid>
    </Card>
  );
}
