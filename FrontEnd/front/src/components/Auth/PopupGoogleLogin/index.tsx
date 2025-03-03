import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import axios from 'axios';

import { useAuth } from '@/context/AuthContext';
import { cookieUtils } from '@/utiles/cookieUtils';

import { auth } from '../firebase-config';

const openError = (errorType: string) => {
  switch (errorType) {
    case 'userNotExist':
      alert('User does not exist.');
      break;
    case 'loginError':
      alert('An error occurred during login.');
      break;
    default:
      alert('An unknown error occurred.');
  }
};

interface PopupGoogleLoginProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  onLoginSuccess: (email: string) => void;
  onLoginCancel: () => void; // 취소 시 콜백 함수 추가
}

const PopupGoogleLogin = ({
  dialogOpen,
  setDialogOpen,
  onLoginSuccess,
  onLoginCancel, // 콜백 함수 추가
}: PopupGoogleLoginProps) => {
  const provider = new GoogleAuthProvider();

  const { setIsLoggedIn, setEmail } = useAuth();

  const handleDialogClose = () => {
    setDialogOpen(false);
    onLoginCancel(); // 취소 시 콜백 함수 호출
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken(); // Firebase ID 토큰

      await axios
        .post('/google/signin', {
          firebase_token: idToken,
        })
        .then((response) => {
          if (response.status === 200) {
            const { access, refresh, user_name, email } = response.data;
            cookieUtils.setCookie('token', access, 1);
            cookieUtils.setCookie('refresh', refresh, 5);

            cookieUtils.setCookie('username', user_name, 1);
            cookieUtils.setCookie('email', email, 1);

            setEmail(email);
            setIsLoggedIn(true);
            onLoginSuccess(email); // 로그인 성공 시 콜백 함수 호출

            // 사용자 정의 이벤트 생성 및 발행
            const loginEvent = new CustomEvent('userLoggedIn', {
              detail: { email },
            });
            window.dispatchEvent(loginEvent); // 이벤트 발행
          }
        })
        .catch((error) => {
          cookieUtils.deleteCookie('token');
          cookieUtils.deleteCookie('refresh');
          cookieUtils.deleteCookie('username');
          cookieUtils.deleteCookie('email');
          setIsLoggedIn(false);
          if (error.response?.status === 403) {
            openError('userNotExist');
          } else {
            openError('loginError');
          }
        });
    } catch (error) {
      cookieUtils.deleteCookie('token');
      cookieUtils.deleteCookie('refresh');
      cookieUtils.deleteCookie('username');
      cookieUtils.deleteCookie('email');
      setIsLoggedIn(false);
      openError('loginError');
    }

    handleDialogClose();
  };

  return (
    <Dialog open={dialogOpen} onClose={handleDialogClose}>
      <Box
        sx={{
          textAlign: 'center',
          pt: 1,
          pb: 4,
          px: { xs: 1, sm: '50px' },
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: { xs: 28, sm: 32 } }}>
          Login
        </DialogTitle>
        <DialogContent sx={{ color: '#7c7c7c', px: 2 }}>
          <Typography
            sx={{
              fontSize: { xs: 15, sm: 18 },
              textAlign: { xs: 'center', sm: 'center' },
            }}
          >
            Create a variety of problems/questions with StudyOLA Store! Discover
            more about our services after logging in.
          </Typography>
        </DialogContent>

        <Box sx={{ mt: { xs: 1, sm: 2 } }}>
          <Button
            onClick={signInWithGoogle}
            sx={{
              border: '1px solid var(--color-gray-2)',
              px: { xs: 5, sm: 10 },
              py: 1,
              borderRadius: '12px',
              textTransform: 'none',
            }}
          >
            <Image
              src="/google-icon.svg"
              alt="google icon"
              width={24}
              height={24}
            />
            <Typography
              sx={{
                ml: 1,
                color: 'var(--color-gray-5)',
                fontSize: { xs: 15, sm: 18 },
              }}
            >
              Get started with Google
            </Typography>
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default PopupGoogleLogin;
