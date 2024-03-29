/**
 * @file dashboard page
 * @author Mingze Ma
 */

import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import actions from "src/actions";
import { message, Spin } from "antd";
import OrgInfoCard from "src/component/OrgInfoCard";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default () => {

  const dispatch = useDispatch();
  const { userInfo, loginStatus, init: userInit } = useSelector(state => state.user);

  const [init, setInit] = useState(false);

  const [orgList, setOrgList] = useState([]);

  useEffect(() => {
    if (userInit) {
      (async () => {
        try {
          if (loginStatus) {
            const res = await actions.getOrgListByUserId({ user_id: _.get(userInfo, 'id') });
            setOrgList(res);
          }
        } catch (e) {
          message.error(e.message);
        } finally {
          setInit(true);
        }
      })();
    }
  }, [loginStatus, userInfo, userInit]);

  useEffect(() => {
    if (userInit && !loginStatus) {
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    }
  }, [loginStatus, userInit]);

  return (
    <ThemeProvider theme={theme}>
      {
        init ? <>{
            loginStatus
              ? <>
                <Container sx={{ pt: 3, pb: 4 }} maxWidth="lg">
                  <Typography variant="h4">
                    Welcome, {_.get(userInfo, 'title')} {_.get(userInfo, 'full_name')}
                  </Typography>
                  <Container disableGutters={true} sx={{ pt: 3 }}>
                    <Typography variant="h5">
                      Please select a conference to continue:
                    </Typography>
                    {!_.isEmpty(orgList) && <Grid container spacing={4} sx={{ pt: 3 }}>
                      {_.map(orgList, (org) => {
                        return (
                          <Grid item key={org.id} xs={12} sm={6} md={4} xl={3}>
                            <OrgInfoCard orgInfo={org}/>
                          </Grid>
                        );
                      })}
                    </Grid>}
                  </Container>
                </Container>
              </>
              : <>
                <div>
                  You need to login first, redirecting to login page...
                </div>
              </>}
          </>
          : <Spin size="large"
                  style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}/>
      }
    </ThemeProvider>
  );
}
