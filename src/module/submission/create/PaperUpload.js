/**
 * @file paper uploading component
 * @author Mingze Ma
 */

import { InboxOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import React, { useMemo } from "react";
import _ from "lodash";

export default (props) => {

  const { value, onChange } = props;

  const uploadProps = useMemo(() => ({
    accept: 'application/pdf',
    name: 'file',
    maxCount: 1,
    action: 'http://localhost:8080/file/upload',

    onChange(info) {
      const { status } = info.file;

      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }

      if (status === 'done') {
        onChange(_.get(info, 'file.response.data.url'));
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },

    onPreview(file) {
      window.open(file.response.data.url)
    }
  }), [onChange]);

  return (
    <Upload.Dragger {...uploadProps}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Only *.pdf files are supported for upload.
        New uploads will replace the previously uploaded files.<br/>
        You can preview the file below by clicking the file name.
      </p>
    </Upload.Dragger>
  );
};
