/**
 * @file review detail list
 * @author Mingze Ma
 */
import Grid from "@mui/material/Grid";
import _ from "lodash";
import ReviewDetailItem from "src/module/review/detail/ReviewDetailItem";
import { Empty } from "antd";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export default (props) => {
  const { data = [], reviewerMap, orgInfo } = props;
  const reviewStage = _.get(orgInfo, 'review_process', 0);

  const userInfo = useSelector(state => state.user.userInfo);

  const { orgId, reviewId } = useParams();

  const editable = useMemo(() => {
    return _.has(reviewerMap, userInfo.id);
  }, [reviewerMap, userInfo.id]);

  return (
    <Grid container spacing={2}>
      {
        data.length > 0
          ? <>{_.map(data, (item) => {
            const reviewerInfo = _.get(reviewerMap, item.user_id, null);
            return (
              <Grid item xs={12} key={item.id}>
                <ReviewDetailItem data={item} type={item.type} reviewerInfo={reviewerInfo}/>
              </Grid>
            );
          })}</>
          : <Grid item xs={12}>
            <Empty
              description="No existing review"
            >
              <Button
                variant="contained"
                disabled={reviewStage !== 3 || !editable}
                onClick={() => window.open(`/org/${orgId}/review_task/${reviewId}/new`)}
              >
                Create one</Button>
            </Empty>
          </Grid>
      }
    </Grid>
  );
};
