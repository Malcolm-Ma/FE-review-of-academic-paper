/**
 * @file review task list index
 * @author Mingze Ma
 */

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import actions from "src/actions";
import Box from "@mui/material/Box";
import { Table } from "antd";
import _ from "lodash";
import IconButton from "@mui/material/IconButton";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import Button from "@mui/material/Button";
import SubmissionDetail from "src/component/SubmissionList/SubmissionDetail";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import DropDownAction from "src/component/DropDownAction";

const columns = (payloads) => {
  const {
    actionList,
    showDrawer,
  } = payloads;

  return [
    {
      title: 'Submission',
      dataIndex: ['submission_info', 'title'],
      width: 400,
    },
    {
      title: 'Authors',
      dataIndex: ['submission_info', 'authors'],
      width: 400,
    },
    {
      title: 'Paper',
      dataIndex: ['submission_info', 'resource_url'],
      align: 'center',
      width: 60,
      render: (text, record) => {
        return (
          <IconButton onClick={() => window.open(text)}><DriveFileMoveIcon/></IconButton>
        );
      },
    },
    {
      title: 'Detail',
      key: 'detail',
      align: 'center',
      width: 60,
      render: (text, record) => {
        return (
          <IconButton onClick={() => showDrawer(record)}><InfoOutlinedIcon/></IconButton>
        );
      },
    },
    {
      title: 'Operations',
      key: 'action',
      align: 'center',
      width: 100,
      fixed: 'right',
      render: (text, record) => {
        return (
          <DropDownAction actionList={actionList}/>
        );
      },
    },
  ];
}

export default () => {
  const { orgId } = useParams();

  const { orgInfo } = useSelector(state => state.org);
  const { userInfo } = useSelector(state => state.user);

  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [focusedItem, setFocusedItem] = useState({});

  const [list, setList] = useState([]);

  const showDrawer = useCallback((item) => {
    setFocusedItem(item);
    setVisible(true);
  }, []);

  const onClose = useCallback(() => {
    setVisible(false);
    setFocusedItem({});
  }, []);

  const getReviewTask = useCallback(async () => {
    try {
      setLoading(true);
      const res = await actions.getReviewTask({
        org_id: orgId,
      });
      setList(res);
    } catch (e) {
      console.error(e.message);
    }
    setLoading(false);
  }, [orgId]);

  const handleActionClick = useCallback(() => {
    console.log('click')
  }, []);

  const actionList = useMemo(() => [
    {
      label: 'Show Reviews',
      onClick: () => handleActionClick,
    },
    {
      label: 'Add Review',
      onClick: () => handleActionClick,
    }
  ], [handleActionClick]);

  useEffect(() => {
    getReviewTask();
    return () => {
      setLoading(false);
      setVisible(false);
    };
  }, [getReviewTask]);

  const payloads = {
    // payloads
    actionList,
    // custom functions
    showDrawer,
  };
  return (
    <>
      <Box>
        <Table
          dataSource={list}
          columns={columns(payloads)}
          loading={loading}
          pagination={false}
          rowKey="id"
          scroll={{ x: 'max-content' }}
        />
      </Box>
      {!_.isEmpty(list) && <SubmissionDetail detail={focusedItem} onClose={onClose} visible={visible}/>}
    </>
  );
}