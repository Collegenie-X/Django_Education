// components/HeaderLogin/UserMenuDialog.tsx
'use client'; // Next.js 13 이상 사용 시 필수

import React, { useEffect, useRef } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { cookieUtils } from '@/utiles/cookieUtils';
import { usePathname } from 'next/navigation';

interface UserMenuDialogProps {
  open: boolean;
  onModalClose: () => void;
  username: string | null;
}

const userMenuConfig = {
  options: [
    { label: 'Profile', url: '/my-page/profile' },
    { label: 'Downloads', url: '/my-page/downloads' },
    { label: 'Payments', url: '/my-page/payments' },
    { label: 'Reports', url: '/my-page/reports' },
  ],
  signOut: {
    label: 'Sign Out',
  },
};

const UserMenuDialog: React.FC<UserMenuDialogProps> = ({
  open,
  onModalClose,
  username,
}) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  let currentPathSegment: string | undefined = undefined;

  if (pathname) {
    currentPathSegment = pathname.split('/').pop()?.toLowerCase();
  }
  const logoutOnClick = async () => {
    const refresh = cookieUtils.getCookie('refresh');

    if (refresh) {
      try {
        cookieUtils.deleteCookie('token');
        cookieUtils.deleteCookie('refresh');
        cookieUtils.deleteCookie('username');
        cookieUtils.deleteCookie('email');

        window.location.reload();

        const loginEvent = new CustomEvent('userLoggedIn', {
          detail: { email: '' },
        });
        window.dispatchEvent(loginEvent);
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }

    onModalClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onModalClose();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onModalClose]);

  return (
    <Box
      ref={dialogRef}
      sx={{
        display: open ? 'block' : 'none',
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: 'white',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: 190,
        zIndex: 1000,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        px: 1,
      }}
    >
      <Box p={2}>
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.82em',
            color: '#4c4c4c',
            width: '100%',
            whiteSpace: 'normal', // 텍스트가 길어지면 두 줄로 처리
          }}
        >
          Hi{' '}
          <span
            style={{
              marginLeft: 5,
              color: '#9c9c9c',
              wordBreak: 'break-word',
            }}
          >
            {' '}
            {username}{' '}
          </span>
        </Typography>
        <Divider sx={{ my: 2, mx: -3 }} />
        {userMenuConfig.options.map((option, index) => {
          // 현재 경로와 메뉴 옵션을 비교하여 활성화 여부 결정
          const isActive = option.label.toLowerCase() === currentPathSegment;

          return (
            <Typography
              key={index}
              onClick={() => {
                window.location.href = option.url;
              }}
              sx={{
                cursor: 'pointer',
                fontSize: 14,
                color: isActive ? '#2BA8FF' : '#7c7c7c', // 활성화된 메뉴는 파란색
                fontWeight: isActive ? 'bold' : 'normal', // 활성화된 메뉴는 굵게 표시
                mt: 2.5,
                mb: 2,
                '&:hover': {
                  color: '#59b7fe',
                },
              }}
            >
              {option.label}
            </Typography>
          );
        })}
        <Divider sx={{ mt: 3, mb: 2, mx: -3 }} />
        <Typography
          onClick={logoutOnClick}
          sx={{
            cursor: 'pointer',
            fontSize: 14,
            color: '#7c7c7c',
            '&:hover': {
              color: '#59b7fe',
            },
          }}
        >
          {userMenuConfig.signOut.label}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserMenuDialog;
