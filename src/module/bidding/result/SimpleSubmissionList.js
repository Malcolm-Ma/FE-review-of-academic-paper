/**
 * @file
 * @author Mingze Ma
 */

import { ProCard, ProTable } from '@ant-design/pro-components';
import IconButton from "@mui/material/IconButton";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import Button from "@mui/material/Button";

import styles from './index.less';
import _ from "lodash";

const columnConfig = [
  {
    title: 'Title',
    dataIndex: ['submission_info', 'title'],
    width: 200,
  },
  {
    title: 'Authors',
    dataIndex: ['submission_info', 'authors'],
    width: 200,
    ellipsis: true,
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
  // {
  //   title: 'Actions',
  //   key: 'action',
  //   align: 'center',
  //   width: 100 + (isAdmin ? 60 : 0),
  //   render: (_text, record) => {
  //     return (
  //       <>
  //         <Button variant="text" onClick={() => showDrawer(record)}>Details</Button>
  //       </>
  //     );
  //   },
  // },
];

export default (props) => {
  const {
    dataSource,
    item,
    onChange,
  } = props;

  return (
    <ProTable
      columns={columnConfig}
      dataSource={dataSource}
      defaultSize="small"
      rowKey="id"
      options={false}
      search={false}
      toolbar={false}
      rowClassName={(record) => {
        return _.get(record, 'submission_info.id') === item.id ? 'split-row-select-active' : '';
      }}
      onRow={(record) => {
        return {
          onClick: () => {
            if (_.get(record, 'submission_info.id')) {
              onChange(_.get(record, 'submission_info', {}));
            }
          },
        };
      }}
    />
  );
}
