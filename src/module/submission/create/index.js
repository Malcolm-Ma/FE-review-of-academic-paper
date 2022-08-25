/**
 * @file create review
 * @author Mingze Ma
 */

import Container from "@mui/material/Container";
import RateReviewIcon from '@mui/icons-material/RateReview';
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import actions from "src/actions";
import _ from "lodash";
import { message, Upload } from 'antd';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { EMAIL_PATTERN } from "src/constants/constants";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import useFormValue from "src/hook/useFormValue";
import PaperUpload from "./PaperUpload";
import Button from "@mui/material/Button";

export default (props) => {

  const navigate = useNavigate();
  const { orgId } = useParams();

  const { userInfo } = useSelector(state => state.user);

  const { register, handleSubmit: handleSubmitHook, formState: { errors } } = useForm();

  const [orgList, setOrgList] = useState([]);

  const [selectedOrgId, handleSelectedOrgIdChange, selectedOrgIdProps] = useFormValue({
    initialValue: '',
    valueFromEvent: true,
  });
  const [deadline, handleDeadlineChange, deadlineProps] = useFormValue({ valueIndex: 0, initialValue: null });
  const [publishedTime, handlePublishedTimeChange, publishedTimeProps] = useFormValue({
    valueIndex: 0,
    initialValue: null,
  });
  const [paperUrl, handlePaperUrlChange] = useFormValue({
    initialValue: '',
    valueIndex: 0,
  });

  const handleSubmit = async (values) => {
    try {
      const res = await actions.createReview({
        ...values,
        deadline,
        org_id: orgId,
        published_time: publishedTime,
        resource_url: paperUrl,
      });
      message.success("Create submission successfully!");
      if (orgId) {
        navigate(`/org/${orgId}`);
      } else {
        navigate('/');
      }
    } catch (e) {
      message.error(e.message);
    }
  };

  const orgSelection = useMemo(() => {
    if (orgId && _.includes(_.map(orgList, 'id'), orgId)) {
      return {
        fixedId: true,
        orgInfo: _.find(orgList, ['id', orgId]),
      };
    }
    return {
      fixedId: false,
      orgList,
    };
  }, [orgId, orgList]);

  const textFieldProps = useMemo(() => {
    if (orgSelection.fixedId) {
      return {
        disabled: true,
        value: orgSelection.orgInfo.name,
      };
    }
    return {
      select: true,
      name: 'org_id',
      ...selectedOrgIdProps,
    };
  }, [orgSelection, selectedOrgIdProps]);

  useEffect(() => {
    (async () => {
      try {
        const res = await actions.getOrgListByUserId({
          user_id: userInfo.id
        });
        setOrgList(res);
      } catch (e) {
        console.error(e.message);
      }
    })();
  }, [userInfo.id]);

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          mt: 2,
          mb: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <RateReviewIcon/>
        </Avatar>
        <Typography component="h1" variant="h4">
          Create New Submission
        </Typography>
        <Box component="form" sx={{ mt: 4 }} onSubmit={handleSubmitHook(handleSubmit)}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Grid
              container
              spacing={3}
            >
              <Grid item xs={12}>
                <Typography variant="h6" align="center">
                  Reviewing Information
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Program Committee"
                  placeholder="Select a Program Committee"
                  {...textFieldProps}
                >
                  {!orgSelection.fixedId && _.map(orgList, (item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DateTimePicker
                  disablePast
                  label="Deadline of Reviewing"
                  {...deadlineProps}
                  renderInput={(params) => <TextField {...params} fullWidth/>}
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 1 }}>
                <Typography variant="h6" align="center">
                  Paper Information
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('title', { required: true })}
                  required
                  fullWidth
                  label="Paper Title"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('authors', { required: true })}
                  required
                  fullWidth
                  helperText="Please use commas to separate multiple authors"
                  label="Authors"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('abstracts', { required: true })}
                  required
                  fullWidth
                  multiline
                  minRows={2}
                  label="Abstracts"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('keywords')}
                  fullWidth
                  label="Keywords"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('contact_email', { required: true, pattern: EMAIL_PATTERN })}
                  required
                  fullWidth
                  label="Contact Email"
                  helperText={!!errors.contact_email && 'Incorrect email.'}
                  error={!!errors.contact_email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  disableFuture
                  label="Published Date"
                  {...publishedTimeProps}
                  renderInput={(params) => <TextField {...params} fullWidth/>}
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 1 }}>
                <Typography variant="h6" align="center">
                  Paper Uploading
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <PaperUpload onChange={handlePaperUrlChange}/>
              </Grid>
            </Grid>
          </LocalizationProvider>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 4 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
