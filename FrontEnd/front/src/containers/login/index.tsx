'use client';
import Link from 'next/link';
import {
  Grid,
  Box,
  Card,
  Stack,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { cookieUtils } from '@/utiles/cookieUtils';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('support@essayfit.com');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const { setIsLoggedIn } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      alert('email or password is required');
    }

    try {
      await axios
        .post('/accounts/login', {
          email,
          password,
        })
        .then((response) => {
          if (response.status === 200) {
            const { access, refresh } = response.data.token;
            const { username, email } = response.data.user;
            cookieUtils.setCookie('token', access, 1);
            cookieUtils.setCookie('refresh', refresh, 5);

            cookieUtils.setCookie('username', username, 1);
            cookieUtils.setCookie('email', email, 1);

            setEmail(email);
            setIsLoggedIn(true);

            // 사용자 정의 이벤트 생성 및 발행
            const loginEvent = new CustomEvent('userLoggedIn', {
              detail: { email },
            });
            window.dispatchEvent(loginEvent); // 이벤트 발행

            router.replace('/best');
          }
        })
        .catch((error) => {
          cookieUtils.deleteCookie('token');
          cookieUtils.deleteCookie('refresh');
          cookieUtils.deleteCookie('username');
          cookieUtils.deleteCookie('email');
          setIsLoggedIn(false);
        });
    } catch (error) {
      cookieUtils.deleteCookie('token');
      cookieUtils.deleteCookie('refresh');
      cookieUtils.deleteCookie('username');
      cookieUtils.deleteCookie('email');
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        '&:before': {
          content: '""',
          background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
          position: 'absolute',
          height: '100%',
          width: '100%',
          opacity: '0.3',
        },
      }}
    >
      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ height: '100vh' }}
      >
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
          <Card
            elevation={9}
            sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '480px' }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb={1}
            >
              <img src="/logo.png" alt="StudyOla Logo" width={150} />
            </Box>
            <Box component="form" onSubmit={handleLogin}>
              <Typography sx={{ fontWeight: 'bold' }}>Email</Typography>
              <TextField
                fullWidth
                margin="dense"
                variant="outlined"
                placeholder="abc@abc.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Typography sx={{ fontWeight: 'bold', mt: 2 }}>
                Password
              </Typography>
              <TextField
                fullWidth
                type="password"
                margin="dense"
                variant="outlined"
                placeholder="************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 3,
                  pr: 1,
                }}
              >
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Remember this Device"
                  />
                </Box>

                <Typography
                  align="center"
                  color="primary"
                  component={Link}
                  href="/forgot-password"
                  sx={{ textDecoration: 'none', fontSize: 15, mt: 1 }}
                >
                  Forgot Password?
                </Typography>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  mb: 2,
                  py: 1.5,
                  fontSize: 16,
                  textTransform: 'none',
                }}
              >
                Login in
              </Button>
            </Box>

            <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
              <Typography
                color="textSecondary"
                fontWeight="400"
                sx={{ fontSize: 18 }}
              >
                New to StudyOla?
              </Typography>
              <Typography
                component={Link}
                href="/signup"
                fontWeight="500"
                sx={{
                  textDecoration: 'none',
                  color: 'primary.main',
                }}
              >
                Create an account
              </Typography>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

Login.layout = 'Blank';
