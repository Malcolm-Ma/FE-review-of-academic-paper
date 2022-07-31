/**
 * @file home page
 * @author Mingze Ma
 */
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import actions from "src/actions";
import { message } from "antd";
import OrgInfoCard from "src/component/OrgInfoCard";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default () => {

  const dispatch = useDispatch();
  const { userInfo, loginStatus } = useSelector(state => state.user);

  const [orgList, setOrgList] = useState([]);

  useEffect(() => {
    loginStatus && (async () => {
      try {
        const res = await actions.getOrgListByUserId({user_id: _.get(userInfo, 'id')});
        setOrgList(res);
      } catch (e) {
        message.error(e.message);
      }
    })();
  }, [loginStatus, userInfo]);

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ pt: 3 }} maxWidth="lg">
        {
          loginStatus
            ? <>
              <Typography variant="h4">
                Welcome, {_.get(userInfo, 'title')} {_.get(userInfo, 'full_name')}
              </Typography>
              <Container disableGutters={true} sx={{pt: 3}}>
                <Typography variant="h5">
                  Please select a conference to continue:
                </Typography>
                {!_.isEmpty(orgList) && <Grid container spacing={4} sx={{pt: 3}}>
                  {_.map(orgList, (org) => {
                    return (
                      <Grid item key={org.id} xs={4}>
                        <OrgInfoCard orgInfo={org} />
                      </Grid>
                    );
                  })}
                </Grid>}
              </Container>
            </>
            : <>
              <Typography variant="h3">
                Welcome to Apex, the App for review of academic papers.<br/>
                Please Sign in first.
              </Typography>
            </>
        }
      </Container>
    </ThemeProvider>
  );
}
