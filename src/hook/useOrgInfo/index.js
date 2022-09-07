/**
 * @file useOrgInfo
 * @author Mingze Ma
 */

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import actions from "src/actions";
import Container from "@mui/material/Container";
import { Alert } from "@mui/material";
import Loading from "src/component/Loading";
import OrgHeader from "./OrgHeader";

export default () => {
  const { orgId } = useParams();
  const dispatch = useDispatch();
  const { orgInfo, hasError, fetched, message } = useSelector(state => state.org);

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
                : <Alert severity="error">{message}</Alert>
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
    OrgHeader
  };
}
