import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { Table, Tag } from "antd";
import _ from "lodash";
import SubmissionDetail from "src/component/SubmissionList/SubmissionDetail";
import actions from "src/actions";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { DATE_FORMAT, USER_TYPE } from "src/constants/constants";
import moment from "moment";
import DropDownAction from "src/component/DropDownAction";
import Button from "@mui/material/Button";

/**
 * @file user list index
 * @author Mingze Ma
 */

const columns = (payloads) => {
  const {
    isAdmin,
    isManager,
    changeMemberType,
    fullDetail,
  } = payloads;
  const config = [
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      render: (text, record) => {

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={_.get(record, 'avatar', '#')}
              alt={_.get(record, 'full_name', '')}
              sx={{ mr: 1 }}
            />
            <Typography variant="subtitle2">{text}</Typography>
          </Box>
        );
      }
    },
    {
      title: 'Member Type',
      dataIndex: 'type',
      render: (text) => {
        const color = (() => {
          if (text === 0) {
            return 'red';
          }
          if (text === 1) {
            return 'green';
          }
          if (text > 1) {
            return 'gold';
          }
        })();
        return <Tag color={color}>{USER_TYPE[text] || 'Member'}</Tag>;
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Join Date',
      dataIndex: 'member_since',
      render: (text) => {
        return moment(text).format(DATE_FORMAT);
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    fullDetail && {
      title: 'Last Name',
      dataIndex: 'last_name',
    },
    fullDetail && {
      title: 'First Name',
      dataIndex: 'first_name',
    },
    (isManager && fullDetail) && {
      title: 'Operations',
      key: 'action',
      align: 'center',
      width: 200,
      fixed: 'right',
      render: (text, record) => {
        const recordRole = record.type;
        return (
          <>
            {(isAdmin && recordRole === 1) && <Button
              variant="text"
              onClick={() => changeMemberType(record.id, 2)}
            >Set as manager</Button>}
            {(isAdmin && recordRole === 2) && <Button
              variant="text"
              onClick={() => changeMemberType(record.id, 1)}
            >Set as member</Button>}
            {(isManager && recordRole === 1) && <Button
              variant="text"
              onClick={() => changeMemberType(record.id, 0)}
            >Block</Button>}
            {(isAdmin && recordRole === 0) && <Button
              variant="text"
              onClick={() => changeMemberType(record.id, 1)}
            >Unblock</Button>}

          </>
        );
      },
    },
  ];
  return _.compact(config);
}

export default (props) => {
  const { fullDetail = true } = props;
  const { orgId } = useParams();
  const navigate = useNavigate();

  const { orgInfo } = useSelector(state => state.org);
  const { userInfo } = useSelector(state => state.user);

  const [loading, setLoading] = useState(true);

  const [list, setList] = useState([]);

  const getUserList = useCallback(() => {
    try {
      setLoading(true);
      const {
        manager_list: managers,
        member_list: members,
        disabled_list: blocked,
      } = orgInfo;
      const res = [
        ...managers,
        ...members,
        ...blocked
      ];
      setList(res);
    } catch (e) {
      console.error(e.message);
    }
    setLoading(false);
  }, [orgInfo]);

  const changeMemberType = useCallback(async (userId, newType) => {
    try {
      const res = await actions.changeMemberType({
        org_id: orgId,
        user_id: userId,
        new_type: newType,
      });
      window.location.reload();
    } catch (e) {
      console.error(e.message);
    }
  }, [orgId]);

  const isAdmin = useMemo(() => {
    const { manager_list: managers } = orgInfo;
    return _.some(managers, ({ id, type }) => id === userInfo.id && type === 3);
  }, [orgInfo, userInfo]);

  const isManager = useMemo(() => {
    const { manager_list: managers } = orgInfo;
    return _.some(managers, ({ id, type }) => id === userInfo.id && type >= 2);
  }, [orgInfo, userInfo]);

  useEffect(() => {
    getUserList();
  }, [getUserList]);

  const payloads = {
    // payloads
    isAdmin,
    isManager,
    fullDetail,
    // custom functions
    changeMemberType,
  };
  return (
    <>
      <Box>
        <Table
          dataSource={list}
          columns={columns(payloads)}
          loading={loading}
          rowKey="id"
          scroll={{ x: 'max-content' }}
          size={fullDetail ? 'default' : 'middle'}
          pagination={{
            style: { paddingRight: '16px' },
            total: _.get(list, 'length'),
            showTotal: total => `Total ${total} members`,
            defaultPageSize: fullDetail ? 20 : 10,
          }}
        />
      </Box>
    </>
  );
};
