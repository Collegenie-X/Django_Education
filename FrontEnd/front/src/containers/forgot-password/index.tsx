'use client'; 

import React from "react";
import { Box, TextField, Button, Typography, Card, Grid } from "@mui/material";
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const handleForgotPassword = (e:any) => {
    e.preventDefault();
    // 비밀번호 찾기 로직 추가
  };

  return (
    <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={12}
        sm={12}
        lg={5}
        xl={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '350px' }}>
          <Typography align="center" gutterBottom sx={{ fontSize: 24, fontWeight: 'bold', mb:2 }}>
            Forgot your password?
          </Typography>
          <Typography align="center" gutterBottom sx={{ fontSize: 12, color: '#acacac' }}>
            Please enter the email address associated with your account and we will email you a link to reset your password.
          </Typography>
          <Box component="form" onSubmit={handleForgotPassword}>
           
            <TextField
              fullWidth
              margin="dense"
              variant="outlined"
              type="email"
              placeholder="abc@abc.com"
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 1, mb: 2, height:40, backgroundColor: '#4A90E2' }}
            >
              Forgot Password
            </Button>
            <Button
              component={Link}
              href="/login"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 ,height:36 , backgroundColor:"#f5f5f5" }}
            >
              Back to Login
            </Button>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
