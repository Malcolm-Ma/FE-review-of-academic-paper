/**
 * @file Submission List Component
 * @author Mingze Ma
 */

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";
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
import { useParams } from "react-router-dom";
import SubmissionDetail from "./SubmissionDetail";

const columnConfig = ({ payloads }) => {

  const {
    showDrawer,
    isAdmin,
    fullDetail,
    prefixColumns,
    unsetColumns,
    fixedAction,
  } = payloads;

  let config = [
    {
      title: 'Title',
      dataIndex: ['submission_info', 'title'],
      width: 400,
      ellipsis: !fullDetail,
    },
    {
      title: 'Authors',
      dataIndex: ['submission_info', 'authors'],
      width: 400,
      ellipsis: true,
    },
    {
      title: 'Published Time',
      width: 120,
      dataIndex: ['submission_info', 'published_time'],
      render: (text, record) => {
        return (
          <p>{moment(text).format(DATE_FORMAT)}</p>
        );
      },
    },
    {
      title: 'Paper',
      dataIndex: ['submission_info', 'resource_url'],
      align: 'center',
      width: 75,
      render: (text, record) => {
        return (
          <IconButton onClick={() => window.open(text)}><DriveFileMoveIcon/></IconButton>
        );
      },
    },
    {
      title: 'Actions',
      key: 'action',
      align: 'center',
      ...fixedAction && ({ fixed: 'right' }),
      width: 100 + (isAdmin ? 60 : 0),
      render: (_text, record) => {
        return (
          <>
            <Button variant="text" onClick={() => showDrawer(record)}>Details</Button>
            {isAdmin && <Button variant="text">Manage</Button>}
          </>
        );
      },
    },
  ];

  if (!fullDetail) {
    config =  _.map(config, (item) => {
      if (_.includes(['Title', 'Authors'], item.title)) {
        _.unset(item, 'width');
      }
      return item;
    });
  }
  if (!_.isEmpty(prefixColumns)) {
    config = [...prefixColumns, ...config];
  }
  if (!_.isEmpty(unsetColumns)) {
    config = _.filter(config, ({ title }) => !_.includes(unsetColumns, title));
  }

  return config;
};

export default forwardRef((props, ref) => {

  const {
    fullHeight,
    fullDetail = true,
    fixedAction = true,
    prefixColumns,
    unsetColumns
  } = props;

  const { orgId } = useParams();

  const { orgInfo } = useSelector(state => state.org);
  const { userInfo } = useSelector(state => state.user);

  const [list, setList] = useState([]);
  const [focusedItem, setFocusedItem] = useState({});

  const [loading, setLoading] = useState(true);

  const [visible, setVisible] = useState(false);

  const getSubmissionList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await actions.getSubmissionList({ org_id: orgId });
      if (_.get(res, 'length', 0) > 0) {
        const sortedList = _.sortBy(res, (item) => {
          return -moment(_.get(item, 'review_task.created_time')).valueOf();
        });
        setList(sortedList);
        return;
      }
      setList([]);
    } catch (e) {
      message.error("Invalid organization id, please check your URL");
    } finally {
      setLoading(false);
    }
  }, [orgId]);

  const showDrawer = (item) => {
    setFocusedItem(item);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    setFocusedItem({});
  };

  const refresh = useCallback(() => {
    getSubmissionList();
  }, [getSubmissionList]);

  const isAdmin = useMemo(() => {
    const managerIdList = _.map(_.get(orgInfo, 'manager_list', []), 'id');
    return _.includes(managerIdList, _.get(userInfo, 'id'));
  }, [orgInfo, userInfo]);

  useEffect(() => {
    getSubmissionList();
    return () => {
      setLoading(false);
    };
  }, [getSubmissionList]);

  useImperativeHandle(ref, () => ({
    refresh,
  }));

  const payloads = {
    // arguments
    isAdmin,
    fullDetail,
    unsetColumns,
    prefixColumns,
    fixedAction,
    // functions
    showDrawer,
  };
  return (
    <>
      <Box>
        <Table
          loading={loading}
          dataSource={list}
          columns={columnConfig({ payloads })}
          scroll={{ y: !fullHeight ? 400 : null, x: fullDetail ? 1500 : null }}
          pagination={{
            showSizeChanger: fullHeight,
            style: { paddingRight: '16px' },
            total: _.get(list, 'length'),
            showTotal: total => `Total ${total} submissions`
          }}
        />
      </Box>
      {!_.isEmpty(list) && <SubmissionDetail detail={focusedItem} onClose={onClose} visible={visible}/>}
    </>
  );
});
