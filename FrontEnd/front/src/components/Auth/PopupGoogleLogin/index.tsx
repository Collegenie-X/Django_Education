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

// 카카오 로그인 관련 타입 선언
declare global {
  interface Window {
    Kakao: any;
  }
}

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

  const signInWithKakao = async () => {
    try {
      // 카카오 SDK가 초기화되었는지 확인
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
      }

      // 카카오 로그인 요청
      const response = await window.Kakao.Auth.login({
        success: async (authObj: any) => {
          const { access_token } = authObj;
          localStorage.setItem('kakao_token', access_token);
          
          // 백엔드로 카카오 토큰 전송
          try {
            const response = await axios.post('/signin/kakao', {
              kakao_token: access_token,
            });

            if (response.status === 200) {
              const { access, refresh, user } = response.data;
              
              cookieUtils.setCookie('token', access, 1);
              cookieUtils.setCookie('refresh', refresh, 5);
              cookieUtils.setCookie('username', user.username, 1);
              cookieUtils.setCookie('email', user.email, 1);

              setEmail(user.email);
              setIsLoggedIn(true);
              onLoginSuccess(user.email);

              // 사용자 정의 이벤트 생성 및 발행
              const loginEvent = new CustomEvent('userLoggedIn', {
                detail: { email: user.email },
              });
              window.dispatchEvent(loginEvent);
            }
          } catch (error) {
            cookieUtils.deleteCookie('token');
            cookieUtils.deleteCookie('refresh');
            cookieUtils.deleteCookie('username');
            cookieUtils.deleteCookie('email');
            setIsLoggedIn(false);
            openError('loginError');
          }
        },
        fail: (error: any) => {
          console.error('카카오 로그인 실패:', error);
          openError('loginError');
        },
      });
    } catch (error) {
      console.error('카카오 로그인 에러:', error);
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

        <Box sx={{ mt: { xs: 1, sm: 2 }, display: 'flex', flexDirection: 'column', gap: 2 }}>
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

          <Button
            onClick={signInWithKakao}
            sx={{
              border: '1px solid #FEE500',
              bgcolor: '#FEE500',
              px: { xs: 5, sm: 10 },
              py: 1,
              borderRadius: '12px',
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#FEE500',
                opacity: 0.9,
              },
            }}
          >
            <Image
              src="/kakao-icon.png"
              alt="kakao icon"
              width={24}
              height={24}
            />
            <Typography
              sx={{
                ml: 1,
                color: '#000000',
                fontSize: { xs: 15, sm: 18 },
              }}
            >
              Get started with Kakao
            </Typography>
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default PopupGoogleLogin;
