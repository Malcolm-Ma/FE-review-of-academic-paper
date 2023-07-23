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
import Box from "@mui/material/Box";
import { Tag } from "antd";

const theme = createTheme();

export default (props) => {

  const { orgInfo } = props;

  const navigate = useNavigate();

  const orgUrl = useMemo(() => (`/org/${_.get(orgInfo, 'id')}/dashboard`), [orgInfo]);

  const color = (() => {
    const text = _.get(orgInfo, 'user_type');
    if (text === 0) {
      return 'red';
    }
    if (text === 1) {
      return 'green';
    }
    if (text > 1) {
      return 'gold';
    }
  })();
  return (
    <ThemeProvider theme={theme}>
      <Card raised={true} sx={{ borderRadius: 2, p: 1 }}>
        <CardHeader
          avatar={<Avatar src={orgIcon} alt=".org"/>}
          sx={{ pb: 0 }}
          title={
            <Link to={orgUrl}>
              <Typography variant="h5">{_.get(orgInfo, 'name')}</Typography>
            </Link>
          }
          subheader={_.get(orgInfo, 'email')}
        />
        <CardContent sx={{ pb: 1 }}>
          <Typography color={theme.palette.grey["800"]} variant="body2">
            {_.truncate(_.get(orgInfo, 'description'), { length: 150 })}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Button size="small" onClick={() => navigate(orgUrl)}>Find More</Button>
          </Box>
          <Box>
            <Tag color={color}>{USER_TYPE[_.get(orgInfo, 'user_type')]}</Tag>
          </Box>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}
