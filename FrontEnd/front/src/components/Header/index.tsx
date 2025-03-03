'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Stack,
  IconButton,
  Container,
  useMediaQuery,
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import HeaderMenu from './HeaderMenu';
import HeaderLogin from './HeaderLogin';
import PopupGoogleLogin from '../Auth/PopupGoogleLogin';
import { CONTENT_WIDTH } from '@/config/config';
import { FaBars } from 'react-icons/fa';
import DrawerComponent from './DrawerComponent';
import { verifyToken } from '@/api/ApiUser';
import { cookieUtils } from '@/utiles/cookieUtils';

const Header: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const { setEmail, isLoggedIn, setIsLoggedIn } = useAuth();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const isSmall = useMediaQuery('(max-width:600px)');
  const isMd = useMediaQuery('(max-width:1200px)');

  const handleEmailClick = async () => {
    if (!isLoggedIn) {
      try {
        const tokenResponse = await verifyToken();

        if (tokenResponse?.is_valid) {
          setIsLoggedIn(true);
          router.push('/my-page/0');
        } else {
          setIsLoggedIn(false);
          setDialogOpen(true);
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setIsLoggedIn(false);
        setDialogOpen(true);
      }
    } else {
      setIsLoggedIn(true);
      router.push('/my-page/0');
      location.reload();
    }
  };

  const handleLoginSuccess = (userEmail: string) => {
    cookieUtils.setCookie('email', userEmail, 1);
    cookieUtils.setCookie('isLoggedIn', 'true', 1);
    setEmail(userEmail);
    setDialogOpen(false);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  let logoSize = { width: 200, height: 100 };
  if (isMd) {
    logoSize = { width: 180, height: 90 };
  } else if (isSmall) {
    logoSize = { width: 140, height: 70 };
  }

  const ViewLogoImage = () => {
    return (
      <Link href={'/best'}>
        <Image
          src={'/studyola_store_logo.png'}
          alt={'StudyOla Store Logo'}
          height={logoSize.height}
          width={logoSize.width}
        />
      </Link>
    );
  };

  return (
    <Container
      sx={{
        maxWidth: {
          xl: `${CONTENT_WIDTH}px`,
          lg: '100%', // lg 이하에서 최대 너비 100%
          md: '100%', // md 이하에서 최대 너비 100%
          sm: '100%', // sm 이하에서 최대 너비 100%
          xs: '100%', // xs 이하에서 최대 너비 100%
        },
        mx: 'auto',
        px: { sm: 0, md: 5 },
      }}
    >
      {/* 반응형 컴포넌트 */}
      {isSmall ? (
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          height={70}
          spacing={2}
          sx={{
            mt: 1,
            alignItems: 'center',
          }}
        >
          <IconButton onClick={toggleDrawer(true)} sx={{ color: '#ccc' }}>
            <FaBars size={24} />
          </IconButton>

          <ViewLogoImage />

          <HeaderLogin handleEmailClick={handleEmailClick} />
        </Stack>
      ) : isMd ? (
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          spacing={2}
          sx={{
            mt: { sm: 2, md: 5 },
            px: 4,
            alignItems: 'center',
          }}
        >
          <IconButton onClick={toggleDrawer(true)} sx={{ color: '#ccc' }}>
            <FaBars size={24} />
          </IconButton>

          <ViewLogoImage />

          <HeaderLogin handleEmailClick={handleEmailClick} />
        </Stack>
      ) : (
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          spacing={1}
          sx={{
            mt: { sm: 2, md: 5 },
            px: { xs: 2, sm: 2, md: 2, lg: 1, xl: 0 },
            alignItems: 'center',
          }}
        >
          <ViewLogoImage />
          <HeaderMenu isMobile={false} />
          <HeaderLogin handleEmailClick={handleEmailClick} />
        </Stack>
      )}

      <DrawerComponent
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        handleEmailClick={handleEmailClick}
      />
      <PopupGoogleLogin
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        onLoginSuccess={handleLoginSuccess}
        onLoginCancel={() => setDialogOpen(false)}
      />
    </Container>
  );
};

export default Header;
