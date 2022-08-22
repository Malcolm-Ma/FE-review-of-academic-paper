/**
 * @file bidding system index
 * @author Mingze Ma
 */

import Typography from "@mui/material/Typography";
import useOrgInfo from "src/hook/useOrgInfo";
import _ from "lodash";
import SubmissionList from "src/component/SubmissionList";
import { Alert, AlertTitle, Card, CardContent } from "@mui/material";
import BiddingChoice from "src/module/bidding/BiddingChoice";
import { useRef } from "react";
import Grid from "@mui/material/Grid";

const prefixColumns = () => {
  return [
    {
      title: 'Bidding Choice',
      key: 'choice',
      width: 232,
      dataIndex: 'bidding_preference',
      render: (text, record) => {

        return (
          <BiddingChoice value={text} submissionId={_.get(record, 'submission_info.id')}/>
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
      <Alert severity="info" sx={{ mb: 3 }} color="info">
        <AlertTitle>Bidding Guidance</AlertTitle>
        Enter your <strong>reviewing preference</strong> by clicking <u>yes</u> / <u>maybe</u> / <u>no</u> below.
        <br/>
        Declare <strong>conflict of interests</strong> as you see fit (e.g. in case one of the authors is from your
        organisation).
      </Alert>
      <Grid container spacing={3}>
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    </OrgPage>
  );
}
