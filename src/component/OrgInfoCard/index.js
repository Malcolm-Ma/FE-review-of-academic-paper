/**
 * @file card for org info
 * @author Mingze Ma
 */

import { Card, CardActions, CardContent, CardHeader } from "@mui/material";
import orgIcon from 'src/assets/org.svg';
import _ from "lodash";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { USER_TYPE } from "src/constants/constants";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useNavigate, Link } from "react-router-dom";
import { useMemo } from "react";

const theme = createTheme();

export default (props) => {

  const { orgInfo } = props;

  const navigate = useNavigate();

  const orgUrl = useMemo(() => (`/org/${_.get(orgInfo, 'id')}/dashboard`), []);

  return (
    <ThemeProvider theme={theme}>
      <Card raised={true} sx={{ borderRadius: 2, p: 1 }}>
        <CardHeader
          avatar={<Avatar src={orgIcon} alt=".org"/>}
          title={
            <Link to={orgUrl}>
              <Typography variant="h5">{_.get(orgInfo, 'name')}</Typography>
            </Link>
          }
          subheader={_.get(orgInfo, 'email')}
        />
        <CardContent>
          <Typography color={theme.palette.grey["800"]} variant="body1">{_.get(orgInfo, 'description')}</Typography>
          <Typography fontWeight="bold" variant="overline">User
            Type: {USER_TYPE[_.get(orgInfo, 'user_type')]}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => navigate(orgUrl)}>Learn More</Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}
