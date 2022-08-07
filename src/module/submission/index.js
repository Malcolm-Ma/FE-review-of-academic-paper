/**
 * @file list of submission index
 * @author Mingze Ma
 */

import Container from "@mui/material/Container";
import SubmissionList from "src/component/SubmissionList";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export default (props) => {

  return (
    <Container maxWidth="xl">
      <Box sx={{ pb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          List of Submissions
        </Typography>
        <Paper>
          <SubmissionList fullHeight={true} />
        </Paper>
      </Box>
    </Container>
  );
};
