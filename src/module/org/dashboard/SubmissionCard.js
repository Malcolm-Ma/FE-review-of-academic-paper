/**
 * @file Submission list card
 * @author Mingze Ma
 */

import { Card, CardHeader } from "@mui/material";
import Button from "@mui/material/Button";
import SubmissionList from "src/component/SubmissionList";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default (props) => {
  const { orgInfo } = props;
  const { id: orgId } = orgInfo;

  const navigate = useNavigate();

  const handleSubmissionListAction = useCallback(() => {
    navigate(`/org/${orgId}/submissions`);
  }, [navigate, orgId]);

  return (
    <Card>
      <CardHeader
        title="Submissions"
        action={<Button onClick={handleSubmissionListAction}>More</Button>}
      />
      <SubmissionList fullDetail={false} />
    </Card>
  );
};
