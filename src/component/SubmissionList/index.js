/**
 * @file Submission List Component
 * @author Mingze Ma
 */

import { useCallback, useEffect, useState } from "react";
import actions from "../../actions";
import { useSelector } from "react-redux";
import _ from "lodash";
import { message, Table } from "antd";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import moment from "moment";
import { DATE_FORMAT, DATETIME_FORMAT } from "src/constants/constants";

const columnConfig = ({ payloads }) => {

  return [
    {
      title: 'Title',
      dataIndex: ['paper_info', 'title'],
    },
    {
      title: 'Authors',
      dataIndex: ['paper_info', 'authors'],
    },
    {
      title: 'Published Time',
      dataIndex: ['paper_info', 'published_time'],
      render: (text, record) => {
        return (
          <p>{moment(text).format(DATE_FORMAT)}</p>
        );
      },
    },
    {
      title: 'Paper',
      dataIndex: ['paper_info', 'resource_url'],
      render: (text, record) => {
        return (
          <IconButton onClick={() => window.open(text)}><DriveFileMoveIcon /></IconButton>
        );
      },
    },
    {
      title: 'Operations',
      key: 'action',
      align: 'center',
      fixed: 'right',
      render: (_text, record) => {
        return (
          <Button variant="text">Details</Button>
        );
      },
    },
  ];
};

export default (props) => {

  const { orgInfo } = useSelector(state => state.org);

  const [list, setList] = useState();

  const getSubmissionList = useCallback(async () => {
    try {
      const res = await actions.getSubmissionList({ org_id: _.get(orgInfo, 'id') });
      console.log('--res--\n', res);
      setList(_.sortBy(res, (o) => -moment(_.get(o, 'paper_info.published_time')).get()));
    } catch (e) {
      message.error(e.message);
    }
  }, [orgInfo]);

  useEffect(() => {
    getSubmissionList();
  }, [getSubmissionList]);

  const payloads = {};
  return (
    <Box>
      <Table
        dataSource={list}
        rowKey={record => _.get(record, 'review_task.id')}
        columns={columnConfig({ payloads })}
      />
    </Box>
  );
};
