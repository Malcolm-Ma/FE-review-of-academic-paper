/**
 * @file user list card
 * @author Mingze Ma
 */

import { Card, CardHeader } from "@mui/material";
import Button from "@mui/material/Button";
import SubmissionList from "src/component/SubmissionList";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import UserList from "src/component/UserList";

export default (props) => {
  const { orgInfo } = props;
  const { id: orgId } = orgInfo;

  const navigate = useNavigate();

  const handleUserListDetail = useCallback(() => {
    navigate(`/org/${orgId}/user`);
  }, [navigate, orgId]);

  return (
    <Card>
      <CardHeader
        title="Members"
        action={<Button onClick={handleUserListDetail}>More</Button>}
      />
      <UserList fullDetail={false} />
    </Card>
  );
};
