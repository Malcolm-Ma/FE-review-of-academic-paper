/**
 * @file org dashboard
 * @author Mingze Ma
 */

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "src/actions";
import { useParams } from "react-router-dom";
import Loading from "src/component/Loading";
import { Alert } from "@mui/material";
import _ from "lodash";

export default (props) => {

  const { orgId } = useParams();

  const dispatch = useDispatch();
  const { orgInfo, hasError, fetched } = useSelector(state => state.org);
  const { userInfo } = useSelector(state => state.user);

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
                <Typography variant="h4">
                  Hi {_.get(userInfo, 'full_name', '')}, Welcome back
                </Typography>
              </Box>
            </>
              : <Alert severity="error">Invalid organization id, please try again.</Alert>
          }</>
          : <Loading/>
      }
    </Container>
  );
};
