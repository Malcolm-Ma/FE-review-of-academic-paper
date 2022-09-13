/**
 * @file review task list index
 * @author Mingze Ma
 */

import { useNavigate, useParams } from "react-router-dom";
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
import { EVALUATION_TYPE } from "src/constants/constants";
import { OVERALL_EVALUATION } from "src/constants/evaluation";

const columns = (payloads) => {
  const {
    actionList,
    reviewProcess,
    adminView,
    showDrawer,
    processIndex,
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
      title: 'Current Decision',
      dataIndex: ['decision'],
      align: 'right',
      render: (text, record) => {
        if (!text) {
          return 'No reviews'
        }
        const floorScore = _.floor(text);
        const label = _.find(OVERALL_EVALUATION, (item) => item.value === floorScore).label || '-';
        return <span><b>{text}</b>: {label}</span>;
      },
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
        const disabled = adminView ? false : (processIndex < 3)
        return (
          <DropDownAction disabled={disabled} actionList={actionList} id={record.id}/>
        );
      },
    },
  ];
}

export default (props) => {
  const { reviewProcess, adminView, processIndex } = props;
  const { orgId } = useParams();
  const navigate = useNavigate();

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
        admin_view: adminView,
      });
      setList(res);
    } catch (e) {
      console.error(e.message);
    }
    setLoading(false);
  }, [adminView, orgId]);

  const handleDetailClick = useCallback((id) => {
    navigate(`/org/${orgId}/review_task/${id}/detail`);
  }, [navigate, orgId]);

  const handleNewReviewClick = useCallback((id) => {
    navigate(`/org/${orgId}/review_task/${id}/new`);
  }, [navigate, orgId]);

  const actionList = useMemo(() => [
    {
      label: 'Show Reviews',
      onClick: handleDetailClick,
    },
    {
      label: 'Add Review',
      onClick: handleNewReviewClick,
      disabled: adminView || processIndex !== 3,
    }
  ], [adminView, handleDetailClick, handleNewReviewClick, processIndex]);

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
    reviewProcess,
    adminView,
    processIndex,
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
