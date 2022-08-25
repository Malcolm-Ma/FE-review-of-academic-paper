/**
 * @file create org
 * @author Mingze Ma
 */

import { message } from 'antd';
import React, { useState } from 'react';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import actions from "src/actions";
import { useNavigate } from "react-router-dom";
import SearchUser from "src/component/SearchUser";
import { Box, Button } from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useForm } from 'react-hook-form';
import { EMAIL_PATTERN } from "src/constants/constants";
import _ from "lodash";

export default () => {

  const navigate = useNavigate();

  const { register, handleSubmit: handleSubmitHook, formState: { errors } } = useForm();

  const [userList, setUserList] = useState([]);

  const handleSubmit = async (values) => {
    try {
      const res = await actions.createOrg({
        ...values,
        user_id_list: _.map(userList, 'id'),
      });
      message.success("Create conference successfully!");
      navigate('/org/' + res.id);
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <BusinessIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Conference
        </Typography>
        <Box component="form" sx={{mt: 3}} onSubmit={handleSubmitHook(handleSubmit)}>
          <Grid
            container
            spacing={3}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('name', { required: true })}
                required
                fullWidth
                label="Organization Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('email', { required: true, pattern: EMAIL_PATTERN })}
                required
                fullWidth
                label="Organization Email"
                helperText={!!errors.email && 'Incorrect email.'}
                error={!!errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('description', { required: true })}
                required
                fullWidth
                label="Description"
              />
            </Grid>
            <Grid item xs={12}>
              <SearchUser
                label="Add Users"
                value={userList}
                onChange={(val) => setUserList(val)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
              >
                Create Conference
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
