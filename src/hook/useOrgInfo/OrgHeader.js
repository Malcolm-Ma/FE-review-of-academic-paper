/**
 * @file org header component
 * @author Mingze Ma
 */

import Box from "@mui/material/Box";

export default (props) => {
  const { children, action } = props;

  return (
    <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
      <Box sx={{ flexGrow: 1 }}>
        {children}
        {action && <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
          {action}
        </Box>}
      </Box>
      {action && <Box sx={{ flexGrow: 0, display: { xs: 'none', sm: 'flex' } }}>
        {action}
      </Box>}
    </Box>
  );
};
