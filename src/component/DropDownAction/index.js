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

  const { actionList, id, disabled } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback((action) => {
    if (_.isFunction(action)) {
      action(id);
    }
    setAnchorEl(null);
  }, [id]);

  return (
    <>
      <Button
        onClick={handleClick}
        disabled={disabled}
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
        {_.map(actionList, ({ label, onClick, disabled }) => (
          <MenuItem key={label} onClick={() => handleClose(onClick)} disabled={disabled}>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
