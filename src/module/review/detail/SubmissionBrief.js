/**
 * @file submission brief info
 * @author Mingze Ma
 */
import { Card } from "@mui/material";
import { Descriptions } from "antd";
import _ from "lodash";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import actions from "src/actions";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import IconButton from "@mui/material/IconButton";

const { Item } = Descriptions;

export default (props) => {
  const { data } = props;

  const [conflict, setConflict] = useState([]);

  useEffect(() => {
    !_.isEmpty(data) && (async () => {
      try {
        const res = await actions.getConflictInterestUsers({ submission_id: data.id });
        setConflict(res);
      } catch (e) {
        console.error(e.message);
      }
    })();
  }, [data, setConflict]);

  return (
    <Card>
      <Typography variant="h6" sx={{p: 2}}>
        Submission Information
      </Typography>
      <Descriptions bordered size="middle">
        <Item label="Submission" span={3}><b>{data.title}</b></Item>
        <Item label="Authors" span={3}>{data.authors}</Item>
        <Item label="Conflict of interest" span={3}>{_.map(conflict, 'full_name').join(', ')}</Item>
        <Item label="File" span={3} style={{ paddingTop: 4, paddingBottom: 4 }}>
          <IconButton onClick={() => window.open(_.get(data, 'resource_url', '#'))}><DriveFileMoveIcon/></IconButton>
        </Item>
        <Item label="Current Decision" span={3}>{data.decision}</Item>

      </Descriptions>
    </Card>
  );
};
