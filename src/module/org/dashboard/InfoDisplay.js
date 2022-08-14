/**
 * @file info display card
 * @author Mingze Ma
 */
import { Card, CardContent, CardHeader } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useCallback, useMemo } from "react";
import { Tag } from "antd";

export default (props) => {
  const { orgInfo } = props;
  const {
    name,
    email,
    description,
    active_status: activeStatus,
  } = orgInfo;

  const ActiveStatusTag = useCallback(() => {
    const tagColor = activeStatus === 1 ? 'green' : undefined;
    const tagName = activeStatus === 1 ? 'Active' : 'Disabled';

    return (
      <Tag
        style={{ marginTop: 8 }}
        color={tagColor}
      >
        {tagName}
      </Tag>
    );
  }, [activeStatus]);

  const rootStyle = useCallback((theme) => ({
    color: theme.palette.primary.darker,
    backgroundColor: theme.palette.primary.lighter
  }), []);

  return (
    <Card sx={rootStyle}>
      <CardHeader title={name} subheader={email} action={<ActiveStatusTag/>}/>
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="body1" component="div">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};
