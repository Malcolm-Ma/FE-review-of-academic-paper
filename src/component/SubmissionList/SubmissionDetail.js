/**
 * @file sebmission detail drawer
 * @author Mingze Ma
 */

import { Col, Divider, Drawer, Row } from "antd";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import moment from "moment";
import { DATE_FORMAT, DATETIME_FORMAT } from "src/constants/constants";
import IconButton from "@mui/material/IconButton";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import { useEffect } from "react";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <Typography variant="subtitle2">
      {title}:
    </Typography>
    {content}
  </div>
);

export default (props) => {
  const { detail, ...drawerProps } = props;

  return (
    <Drawer
      width={640}
      placement="right"
      closable={false}
      zIndex={10000}
      destroyOnClose={true}
      {...drawerProps}
    >
      <Typography variant="h5" sx={{ pb: 3 }}>
        Submission Detail
      </Typography>
      <Typography variant="h6" sx={{ pb: 2 }}>Paper Information</Typography>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <DescriptionItem title="Title" content={_.get(detail, 'submission_info.title', '')}/>
        </Col>
        <Col span={24}>
          <DescriptionItem title="Authors" content={_.get(detail, 'submission_info.authors', '')}/>
        </Col>
        <Col span={24}>
          <DescriptionItem title="Abstract" content={_.get(detail, 'submission_info.abstracts', '')}/>
        </Col>
        <Col span={12}>
          <DescriptionItem title="Keywords" content={_.get(detail, 'submission_info.keywords', 'N/A')}/>
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Published Time"
            content={moment(_.get(detail, 'submission_info.published_time')).format(DATE_FORMAT)}/>
        </Col>
        <Col span={12}>
          <DescriptionItem title="Contact Email" content={_.get(detail, 'submission_info.contact_email', 'N/A')}/>
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="Resource"
            content={
              <IconButton
                sx={{ p: 0 }}
                onClick={() => window.open(_.get(detail, 'submission_info.resource_url', '#'))}
              >
                <DriveFileMoveIcon/>
              </IconButton>
            }
          />
        </Col>
      </Row>
      <Divider/>
      <Typography variant="h6" sx={{ pb: 2 }}>Submitter Information</Typography>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <DescriptionItem title="Title" content={_.get(detail, 'user_info.title', 'N/A')}/>
        </Col>
        <Col span={12}>
          <DescriptionItem title="Name" content={_.get(detail, 'user_info.full_name', 'N/A')}/>
        </Col>
        <Col span={24}>
          <DescriptionItem
            title="Created Time"
            content={moment(_.get(detail, 'user_info.created_time')).format(DATETIME_FORMAT)}
          />
        </Col>
      </Row>
    </Drawer>
  );
}
