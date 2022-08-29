/**
 * @file drop down actions
 * @author Mingze Ma
 */

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import _ from "lodash";
import { useCallback, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default (props) => {

  const { actionList } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback((action) => {
    if (_.isFunction(action)) {
      action();
    }
    setAnchorEl(null);
  }, []);

  return (
    <>
      <Button
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
      >
        Review
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {_.map(actionList, ({ label, onClick }) => (
          <MenuItem key={label} onClick={() => handleClose(onClick)}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
