import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import actions from "src/actions";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import Grid from "@mui/material/Grid";
import InfoDisplay from "src/module/org/dashboard/InfoDisplay";
import ReviewStatus from "src/module/org/dashboard/ReviewStatus";
import ProcessDetail from "src/module/org/dashboard/ProcessDetail";
import SubmissionCard from "src/module/org/dashboard/SubmissionCard";
import { Alert } from "@mui/material";
import Loading from "src/component/Loading";

/**
 * @file useOrgInfo
 * @author Mingze Ma
 */

export default () => {
  const { orgId } = useParams();
  const dispatch = useDispatch();
  const { orgInfo, hasError, fetched } = useSelector(state => state.org);

  useEffect(() => {
    dispatch(actions.getOrgInfo({ org_id: orgId }));
  }, [dispatch, orgId]);

  const OrgPage = (props) => {
    const {children, ...otherProps} = props;

    return (
      <Container maxWidth="xl" {...otherProps}>
        {
          fetched
            ? <>{
              !hasError ? <>
                  {children}
                </>
                : <Alert severity="error">Invalid organization id, please try again.</Alert>
            }</>
            : <Loading/>
        }
      </Container>
    );
  };

  return {
    orgInfo,
    hasError,
    fetched,
    OrgPage,
  };
}
