import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import _ from "lodash";
import { Divider, Stack } from "@mui/material";
import { useCallback } from "react";
import actions from "src/actions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { APPBAR_DESKTOP, APPBAR_MOBILE } from "src/constants/constants";

const pages = [
  {
    name: 'Dashboard',
    url: 'dashboard'
  },
  {
    name: 'Submission',
    url: 'submissions'
  },
  {
    name: 'Reviews',
    url: 'reviews',
  },
  {
    name: 'Status',
    url: 'status',
  },
  {
    name: 'Bidding',
    url: 'bidding',
  },
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = (props) => {
  const { userInfo } = props;

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { orgInfo, fetched } = useSelector(state => state.org);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (url) => {
    setAnchorElNav(null);
    navigate(`/org/${_.get(orgInfo, 'id')}/${url}`);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingClick = useCallback(async (value) => {
    handleCloseUserMenu();
    switch (value) {
      case 'Logout': {
        try {
          await dispatch(actions.logout());
          message.success('Sign out successfully')
          navigate('/login');
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [dispatch, navigate]);

  const handleCreateSubmissionNavigate = useCallback(() => {
    const orgId = _.get(orgInfo, 'id', null);
    if (orgId) {
      navigate(`/org/${orgId}/submission/create`);
      return;
    }
    navigate(`/submission/create`);
  }, [navigate, orgInfo]);

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={(theme) => ({
            minHeight: APPBAR_MOBILE,
            [theme.breakpoints.up('lg')]: {
              minHeight: APPBAR_DESKTOP
            },
          })}
        >
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Apex
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon/>
            </IconButton>
            {fetched && <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={() => handleCloseNavMenu(page.url)}>
                  <Typography variant="h6" textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>}
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}/>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            APEX
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {fetched && pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleCloseNavMenu(page.url)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {
              !_.get(userInfo, 'id', null)
                ? <Stack spacing={1} direction="row">
                  <Button color="inherit" href="/register">Sign up</Button>
                  <Button variant="outlined" color="inherit" href="/login">Login</Button>
                </Stack>
                : <>
                  <Stack spacing={3} direction="row">
                    <Button
                      color="inherit"
                      variant="outlined"
                      onClick={handleCreateSubmissionNavigate}
                      sx={{ display: { xs: 'none', md: 'flex' } }}
                    >
                      New Submission
                    </Button>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt={_.get(userInfo, 'name', 'A')}
                          src={_.get(userInfo, 'avatar') || '#'}
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem disabled={true}>
                        <Typography
                          variant="body1"
                          textAlign="left"
                        >
                          Hi, {_.get(userInfo, 'title')} {_.get(userInfo, 'full_name')}
                        </Typography>
                      </MenuItem>
                      <Divider/>
                      {settings.map((setting) => (
                        <MenuItem key={setting} onClick={() => handleSettingClick(setting)}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Stack>
                </>
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
