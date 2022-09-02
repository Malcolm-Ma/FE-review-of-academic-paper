/**
 * @file review detail item
 * @author Mingze Ma
 */
import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Descriptions } from "antd";
import _ from "lodash";
import IconButton from "@mui/material/IconButton";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import { useMemo } from "react";
import { CONFIDENCE, OVERALL_EVALUATION } from "src/constants/evaluation";
import moment from "moment";
import { DATETIME_FORMAT, EVALUATION_TYPE } from "src/constants/constants";
import ReviewContent from "src/module/review/detail/ReviewContent";

const { Item } = Descriptions;

export default (props) => {
  const { type = 1, data, reviewerInfo } = props;
  const reviewType = type === 1;

  const reviewer = useMemo(() => {
    if (!reviewerInfo) {
      return 'Anonymous Reviewer';
    }
    return _.get(reviewerInfo, 'full_name', '-');
  }, [reviewerInfo]);

  const cardId = useMemo(() => {
    const type = reviewType ? 'Review' : 'Comment';
    return `${type}_${data.review_index}`;
  }, [data.review_index, reviewType]);

  return (
    <Card id={cardId}>
      <Typography variant="subtitle1" sx={{ p: 2 }}>
        {reviewType ? 'Review' : 'Comment'} {data.review_index}
      </Typography>
      <Descriptions
        bordered size="small"
        labelStyle={{ width: 250 }}
      >
        <Item label="Reviewer" span={3}>{reviewer}</Item>
        {!reviewType && <Item label="Comment" span={3}>
          {_.get(data, 'evaluation_content', '')}
        </Item>}
        <Item label="Time" span={3}>
          {moment(_.get(data, 'review_date', '-')).format(DATETIME_FORMAT)}
        </Item>
        {reviewType && ReviewContent({ data })}
      </Descriptions>
    </Card>
  );
};
