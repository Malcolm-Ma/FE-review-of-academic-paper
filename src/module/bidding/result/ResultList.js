/**
 * @file review result list
 * @author Mingze Ma
 */

import { ProTable } from '@ant-design/pro-components';
import IconButton from "@mui/material/IconButton";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import Button from "@mui/material/Button";

import styles from './index.less';
import _ from "lodash";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import * as React from "react";

const columnConfig = [
  {
    title: 'Name',
    dataIndex: 'avatar',
    render: (text, record) => {
      return (
        <Avatar
          alt={_.get(record, 'name', 'A')}
          src={_.get(record, 'avatar') || '#'}
        />
      );
    },
  },
  {
    title: 'Name',
    dataIndex: 'full_name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  // {
  //   title: 'Banned / Deleted',
  //   dataIndex: 'enable_status',
  //   render: (text) => {
  //     return
  //   }
  // },
];

export default (props) => {
  const {
    dataSource,
    item,
    onChange,
  } = props;

  const [tableListDataSource, setTableListDataSource] = useState([]);

  useEffect(() => {
    console.log('--item--\n', item);
    const curResult = _.get(dataSource, item.id, {});
    setTableListDataSource(_.get(curResult, 'user_list', []));
  }, [dataSource, item]);

  return (
    <ProTable
      columns={columnConfig}
      dataSource={tableListDataSource}
      rowKey="id"
      options={false}
      search={false}
      toolbar={false}
      pagination={false}
    />
  );
}
