/**
 * @file paper description card
 * @author Mingze Ma
 */
import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import Typography from "@mui/material/Typography";

export default (props) => {
  const { submissionInfo } = props;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ pb: 2 }}>
          Submission Information
        </Typography>
        <Typography variant="body1">
          Title: {submissionInfo.title}
        </Typography>
        <Typography variant="body1">
          Authors: {submissionInfo.authors}
        </Typography>
      </CardContent>
    </Card>
  );
}
