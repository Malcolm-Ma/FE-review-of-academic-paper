/**
 * @file review content
 * @author Mingze Ma
 */

import { useMemo } from "react";
import _ from "lodash";
import { CONFIDENCE, OVERALL_EVALUATION } from "src/constants/evaluation";
import Typography from "@mui/material/Typography";
import { Descriptions } from "antd";

const { Item } = Descriptions;

export default (props) => {
  const { data } = props;

  const evaluationScore = useMemo(() => {
    const score = _.toNumber(_.get(data, 'overall_evaluation', 0));
    const label = _.find(OVERALL_EVALUATION, { value: score }).label || '-';
    return <p><b>{score}</b>: ({label})</p>;
  }, [data]);

  const confidence = useMemo(() => {
    const score = _.get(data, 'confidence', '-');
    const label = _.find(CONFIDENCE, { value: score }).label || '-';
    return <p><b>{score}</b>: ({label})</p>;
  }, [data]);

  return (
    <>
      <Item label="Overall Evaluation" span={3}>
        {evaluationScore}
        {_.get(data, 'evaluation_content', '-')}
      </Item>
      <Item label="Reviewer's confidence" span={3}>{confidence}</Item>
      <Item label="Confidential remarks for the program committee" span={3}>
        {_.get(data, 'confidence_remark', '')}
      </Item>
      <Item label="Accept as a short paper" span={3}>
        {_.get(data, 'as_short_paper', 1) === 1 ? 'Yes' : '-'}
      </Item>
    </>
  );
}
