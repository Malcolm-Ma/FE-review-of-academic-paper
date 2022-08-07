/**
 * @file Submission List Component
 * @author Mingze Ma
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import actions from "../../actions";
import { useSelector } from "react-redux";
import _ from "lodash";
import { message, Table, Drawer, Row, Col, Divider } from "antd";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import moment from "moment";
import { DATE_FORMAT, DATETIME_FORMAT } from "src/constants/constants";
import { useParams } from "react-router-dom";

const columnConfig = ({ payloads }) => {

  const { showDrawer, isAdmin } = payloads;

  return [
    {
      title: 'Title',
      dataIndex: ['paper_info', 'title'],
      width: 400,
      render: (text, record) => (
        <a href='#'>{text}</a>
      ),
    },
    {
      title: 'Authors',
      dataIndex: ['paper_info', 'authors'],
      width: 400,
      ellipsis: true,
    },
    {
      title: 'Published Time',
      width: 120,
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
      align: 'center',
      width: 75,
      render: (text, record) => {
        return (
          <IconButton onClick={() => window.open(text)}><DriveFileMoveIcon /></IconButton>
        );
      },
    },
    {
      title: 'Operations',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (_text, record) => {
        return (
          <>
            <Button variant="text" onClick={showDrawer}>Details</Button>
            {isAdmin && <Button variant="text">Manage</Button>}
          </>
        );
      },
    },
  ];
};

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

export default (props) => {

  const { fullHeight } = props;

  const { orgId } = useParams();

  const { orgInfo } = useSelector(state => state.org);
  const { userInfo } = useSelector(state => state.user);

  const [list, setList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [visible, setVisible] = useState(false);

  const getSubmissionList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await actions.getSubmissionList({ org_id: orgId });
      console.log('--res--\n', res);
      if (_.get(res, 'length', 0) > 0) {
        const sortedList = _.sortBy(res, (item) => {
          return -moment(_.get(item, 'review_task.created_time'));
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

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const isAdmin = useMemo(() => {
    const managerIdList = _.map(_.get(orgInfo, 'manager_list', []), 'id');
    return _.includes(managerIdList, _.get(userInfo, 'id'));
  }, [orgInfo, userInfo]);

  useEffect(() => {
    getSubmissionList();
  }, [getSubmissionList]);

  const payloads = {
    // arguments
    isAdmin,
    // functions
    showDrawer,
  };
  return (
    <>
      <Box>
        {
          <Table
            loading={loading}
            dataSource={list}
            columns={columnConfig({ payloads })}
            scroll={{ y: !fullHeight ? 400 : null , x: 1500 }}
            pagination={{
              showSizeChanger: true,
              style: { paddingRight: '16px' }
            }}
          />
        }
      </Box>
      <Drawer width={640} placement="right" closable={false} onClose={onClose} visible={visible} zIndex={10000}>
        <p
          className="site-description-item-profile-p"
          style={{
            marginBottom: 24,
          }}
        >
          User Profile
        </p>
        <p className="site-description-item-profile-p">Personal</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Full Name" content="Lily"/>
          </Col>
          <Col span={12}>
            <DescriptionItem title="Account" content="AntDesign@example.com"/>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="City" content="HangZhou"/>
          </Col>
          <Col span={12}>
            <DescriptionItem title="Country" content="China🇨🇳"/>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Birthday" content="February 2,1900"/>
          </Col>
          <Col span={12}>
            <DescriptionItem title="Website" content="-"/>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Message"
              content="Make things as simple as possible but no simpler."
            />
          </Col>
        </Row>
        <Divider/>
        <p className="site-description-item-profile-p">Company</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Position" content="Programmer"/>
          </Col>
          <Col span={12}>
            <DescriptionItem title="Responsibilities" content="Coding"/>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Department" content="XTech"/>
          </Col>
          <Col span={12}>
            <DescriptionItem title="Supervisor" content={<a>Lin</a>}/>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Skills"
              content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
            />
          </Col>
        </Row>
        <Divider/>
        <p className="site-description-item-profile-p">Contacts</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Email" content="AntDesign@example.com"/>
          </Col>
          <Col span={12}>
            <DescriptionItem title="Phone Number" content="+86 181 0000 0000"/>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Github"
              content={
                <a href="http://github.com/ant-design/ant-design/">
                  github.com/ant-design/ant-design/
                </a>
              }
            />
          </Col>
        </Row>
      </Drawer>
    </>
  );
};
