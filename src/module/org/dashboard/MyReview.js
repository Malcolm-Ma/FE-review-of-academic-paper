/**
 * @file my review card
 * @author Mingze Ma
 */
import { Card, CardContent, CardHeader } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ArticleIcon from '@mui/icons-material/Article';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import _ from "lodash";

export default (props) => {
  const { orgInfo } = props;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">My Reviews</Typography>
        <Grid container spacing={3} sx={{ pt: 2 }}>
          <Grid item xs={6} sm={4} md={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<PostAddOutlinedIcon />}
              disabled={_.get(orgInfo, 'review_process', 0) !== 1}
              href={`/org/${orgInfo.id}/submission/create`}
            >
              Upload Submission
            </Button>
          </Grid>
          <Grid item xs={6} sm={4} md={3} lg={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<ArticleIcon/>}
              href={`/org/${orgInfo.id}/submissions?scope=my`}
            >
              My Submissions
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
