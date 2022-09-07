/**
 * @file my review card
 * @author Mingze Ma
 */
import { Card, CardContent, CardHeader } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ArticleIcon from '@mui/icons-material/Article';

export default (props) => {
  const { orgInfo } = props;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">My Reviews</Typography>
        <Grid container sx={{ pt: 2 }}>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<ArticleIcon />}
              href={`/org/${orgInfo.id}/submissions?scope=my`}
            >
              My Submission
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
