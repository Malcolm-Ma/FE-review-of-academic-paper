/**
 * @file review detail page
 * @author Mingze Ma
 */

import useOrgInfo from "src/hook/useOrgInfo";
import { useCallback, useEffect, useMemo, useState } from "react";
import actions from "src/actions";
import { useParams } from "react-router-dom";
import _ from "lodash";
import Box from "@mui/material/Box";
import { BackTop, Spin, Table } from "antd";
import Typography from "@mui/material/Typography";
import { Alert, AlertTitle, Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import SubmissionBrief from "src/module/review/detail/SubmissionBrief";
import { DATE_FORMAT, EVALUATION_TYPE } from "src/constants/constants";
import moment from "moment";
import { CheckOutlined, InfoCircleTwoTone } from "@ant-design/icons";
import Button from "@mui/material/Button";

import './index.less';
import { useSelector } from "react-redux";
import ReviewDetailList from "src/module/review/detail/ReviewDetailList";

const columnConfig = (payloads = {}) => {
  const { reviewerMap, userInfo } = payloads;

  return [
    {
      title: 'Index',
      className: 'table-index-col',
      key: 'index',
      render: (_text, record) => {
        const type = EVALUATION_TYPE[record.type] || 'Review';
        const href = `#${type}_${record.review_index}`
        return (
          <a href={href}>{EVALUATION_TYPE[type] || 'Review'} {record.review_index}</a>
        );
      },
    },
    {
      title: 'Date',
      dataIndex: 'review_date',
      render: (text) => {
        return moment(text).format(DATE_FORMAT);
      },
    },
    {
      title: 'Revierer',
      dataIndex: 'user_id',
      render: (text) => {
        return _.get(reviewerMap[text], 'full_name', '');
      },
    },
    {
      title: 'Overall evaluation',
      dataIndex: 'overall_evaluation',
      align: 'right',
    },
    {
      title: 'Reviewer\'s confidence',
      dataIndex: 'confidence',
      align: 'right',
    },
    {
      title: () => (
        <span>Short Paper <InfoCircleTwoTone /></span>
      ),
      dataIndex: 'confidence',
      align: 'center',
      render: (text) => text === 1 && <CheckOutlined/>
    },
    {
      title: 'Actions',
      key: 'action',
      align: 'center',
      render: (text, record) => {
        const currReviewer = _.get(reviewerMap, _.get(record, 'user_id'));
        const showRevise = (userInfo.id === _.get(currReviewer, 'id', ''))
          && (_.get(record, 'active_status', 0) === 0);
        return (
          <>
            {showRevise && <Button variant="text">Revise</Button>}
          </>
        );
      }
    },
  ];
};

const NotStartAlert = ({ processIndex }) => {
  const alertText = (() => {
    if (processIndex < 3) {
      return 'The organization is not ready for reviewing papers. Please come back later'
    }
    if (processIndex > 3) {
      return 'Paper reviewing is over'
    }
  })();

  return (
    <>
      <Alert severity="warning">
        <Typography variant="subtitle1">{alertText}</Typography>
      </Alert>
    </>
  )
};


export default () => {
  const { orgInfo, OrgPage, fetched } = useOrgInfo();
  const { reviewId } = useParams();

  const { userInfo } = useSelector(state => state.user);

  const [data, setData] = useState({});

  const getReviewSummary = useCallback(async () => {
    try {
      const res = await actions.getReviewSummary({ review_id: reviewId, org_id: orgInfo.id });
      setData(res);
    } catch (e) {
      console.error(e.message);
    }
  }, [orgInfo.id, reviewId]);

  const reviewInfoList = useMemo(() => _.get(data, 'review_evaluation_list', []), [data]);

  const reviewerMap = useMemo(() => {
    const reviewerList = _.get(data, 'reviewer_list', []);
    return _.reduce(reviewerList, (result, curr) => {
      const { id } = curr;
      return {
        ...result,
        [id]: curr,
      };
    }, {});
  }, [data]);

  useEffect(() => {
    fetched && getReviewSummary();
  }, [fetched, getReviewSummary]);

  const payloads = {
    reviewerMap,
    userInfo
  };
  const reviewProcess = _.get(orgInfo, 'review_process', 0) === 3;
  return (
    <OrgPage maxWidth="lg">
      {reviewProcess ? <>{!_.isEmpty(data)
        ? <Box>
          <BackTop />
          <Typography variant="h5" sx={{ mb: 3 }}>
            Reviews and Comments on <i>{_.get(data, 'submission_info.title')}</i>
          </Typography>
          <Alert severity="info" color="info">
            Click "revise" to <b>revise a review</b><br/>
            Click "Add Comment" to <b>submit a comment</b> on this submission.
          </Alert>
          <Grid container spacing={3} sx={{ pt: 3 }}>
            <Grid item xs={12}>
              <SubmissionBrief data={_.get(data, 'submission_info')}/>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <Typography variant="h6" sx={{ p: 2 }}>
                  Summary of Received Reviews and Comments
                </Typography>
                <Table
                  dataSource={reviewInfoList}
                  rowKey="id"
                  columns={columnConfig(payloads)}
                  size="small"
                  rowClassName={(record) => _.get(record, 'active_status', 0) === 0 && 'disabled-row'}
                  pagination={false}
                />
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Reviews and Comments
              </Typography>
              <ReviewDetailList reviewerMap={reviewerMap} data={reviewInfoList} />

            </Grid>
          </Grid>
        </Box>
        : <Spin/>}</>
      : <NotStartAlert processIndex={_.get(orgInfo, 'review_process', 0)} />}
    </OrgPage>
  );
}
