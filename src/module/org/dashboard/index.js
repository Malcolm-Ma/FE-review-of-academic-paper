/**
 * @file org dashboard
 * @author Mingze Ma
 */

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "src/actions";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "src/component/Loading";
import { Alert, Card, CardContent, CardHeader } from "@mui/material";
import _ from "lodash";
import Grid from "@mui/material/Grid";
import SubmissionList from "src/component/SubmissionList";
import Button from "@mui/material/Button";

export default (props) => {

  const { orgId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { orgInfo, hasError, fetched } = useSelector(state => state.org);
  const { userInfo } = useSelector(state => state.user);

  const handleSubmissionListAction = useCallback(() => {
    navigate(`org/${orgId}/submissions`);
  }, [navigate, orgId]);

  useEffect(() => {
    dispatch(actions.getOrgInfo({
      org_id: orgId,
    }));
  }, [dispatch, orgId]);

  return (
    <Container maxWidth="xl">
      {
        fetched
          ? <>{
            !hasError ? <>
                <Box sx={{ pb: 5 }}>
                  <Typography variant="h4" sx={{ mb: 4 }}>
                    Hi {_.get(userInfo, 'full_name', '')}, Welcome back
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Card>
                        <CardHeader
                          title="Submission List"
                          action={<Button onClick={handleSubmissionListAction}>More</Button>}
                        />
                        <SubmissionList sx={{ px: 2 }}/>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              </>
              : <Alert severity="error">Invalid organization id, please try again.</Alert>
          }</>
          : <Loading/>
      }
    </Container>
  );
};
