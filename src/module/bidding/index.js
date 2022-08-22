/**
 * @file bidding system index
 * @author Mingze Ma
 */

import Typography from "@mui/material/Typography";
import useOrgInfo from "src/hook/useOrgInfo";
import _ from "lodash";
import SubmissionList from "src/component/SubmissionList";
import { Card } from "@mui/material";
import BiddingChoice from "src/module/bidding/BiddingChoice";
import { useRef } from "react";

const prefixColumns = () => {
  return [
    {
      title: 'Bidding Choice',
      key: 'choice',
      width: 232,
      render: (text, record) => {

        return (
          <BiddingChoice submissionId={_.get(record, 'submission_info.id')} />
        );
      }
    },
  ];
}

export default (props) => {
  const {} = props;

  const { orgInfo, OrgPage } = useOrgInfo();

  const listRef = useRef(null);

  return (
    <OrgPage>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {_.get(orgInfo, 'name')} Paper Bidding
      </Typography>
      <Card>
        <SubmissionList
          ref={listRef}
          fullHeight={true}
          fixedAction={false}
          fullDetail={false}
          unsetColumns={['Published Time']}
          prefixColumns={prefixColumns()}
        />
      </Card>
    </OrgPage>
  );
}
