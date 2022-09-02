import useOrgInfo from "src/hook/useOrgInfo";
import { ProCard, ProTable } from '@ant-design/pro-components';
import Typography from "@mui/material/Typography";
import SimpleSubmissionList from "src/module/bidding/result/SimpleSubmissionList";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import actions from "src/actions";
import moment from "moment";
import { message } from "antd";
import { useParams } from "react-router-dom";
import ResultList from "src/module/bidding/result/ResultList";

/**
 * @file bidding result index
 * @author Mingze Ma
 */

export default () => {
  const { orgInfo, OrgPage } = useOrgInfo();

  const { orgId } = useParams();

  const [loading, setLoading] = useState(true);

  const [submissionData, setSubmissionData] = useState([]);
  const [resultData, setResultData] = useState({});
  const [focusedItem, setFocusedItem] = useState({});

  const getSubmissionList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await actions.getSubmissionList({ org_id: orgId });
      if (_.get(res, 'length', 0) > 0) {
        const sortedList = _.sortBy(res, (item) => {
          return -moment(_.get(item, 'review_task.created_time')).valueOf();
        });
        setSubmissionData(sortedList);
        if (sortedList.length > 0) {
          setFocusedItem(_.get(sortedList, '0.submission_info', {}));
        }
        return;
      }
      setSubmissionData([]);
    } catch (e) {
      message.error("Invalid organization id, please check your URL");
    } finally {
      setLoading(false);
    }
  }, [orgId]);

  const getReviewMapList = useCallback(async () => {
    try {
      const res = await actions.getBiddingResult({
        org_id: orgId
      });
      setResultData(res);
    } catch (e) {
      console.error(e.message);
    }
  }, [orgId]);

  useEffect(() => {
    getSubmissionList();
    getReviewMapList();
  }, [getReviewMapList, getSubmissionList]);

  return (
    <OrgPage>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Paper Bidding Result
      </Typography>
      <ProCard split="vertical">
        <ProCard colSpan="60%">
          <SimpleSubmissionList
            dataSource={submissionData}
            onChange={(item) => setFocusedItem(item)}
            item={focusedItem}
          />
        </ProCard>
        <ProCard title={_.get(focusedItem, 'title', 'Please select one submission')}>
          <ResultList item={focusedItem} dataSource={resultData} />
        </ProCard>
      </ProCard>
    </OrgPage>
  );
}
