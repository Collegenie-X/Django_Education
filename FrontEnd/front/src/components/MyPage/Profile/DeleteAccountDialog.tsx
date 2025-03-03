import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Link,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

import { cookieUtils } from '@/utiles/cookieUtils';

interface DeleteAccountDialogProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  onClose: () => void;
}

const DeleteAccountDialog: React.FC<DeleteAccountDialogProps> = ({
  dialogOpen,
  setDialogOpen,
  onClose,
}) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn, setEmail } = useAuth();

  const handleDialogClose = () => {
    setDialogOpen(false);
    setIsButtonEnabled(false);
  };

  const handleImageClick = () => {
    setIsButtonEnabled(!isButtonEnabled);
  };

  const onCloseClick = () => {
    onClose();
    setIsButtonEnabled(false);
  };

  const handleDelete = async () => {
    // API 호출
    //   const response = await getUserDelete();

    //   if (response.status === 200) {
    // 캐시 및 쿠키 삭제
    cookieUtils.deleteCookie('token');
    cookieUtils.deleteCookie('refresh');

    cookieUtils.deleteCookie('username');
    cookieUtils.deleteCookie('email');

    setIsLoggedIn(false);
    setEmail('');
    handleDialogClose();
    router.push('/');
    //   }
  };

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleDialogClose}
      sx={{
        width: 770,
        mx: 'auto',
        my: 'auto',
        textAlign: 'left',
        justifyContent: 'flex-start',
      }}
    >
      <Box sx={{ py: 4, px: 8 }}>
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: 24,
            ml: -4,
            mb: 2,
          }}
        >
          Delete Account
        </DialogTitle>
        <Box
          sx={{
            backgroundColor: isButtonEnabled
              ? 'var(--color-blue-2)'
              : 'var(--color-white)',
            border: '1px solid var(--color-blue-main)',
            borderRadius: '20px',
            py: 3,
            px: 5,
            mx: 2,
            mb: 2,
            color: isButtonEnabled ? '#1a1a1a' : '#5d5d5d',
          }}
        >
          <Typography sx={{ mb: 2, fontSize: 16 }}>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </Typography>
          <Typography sx={{ mb: 4, fontSize: 16 }}>
            By deleting your account, you will lose all your data, and it cannot
            be recovered.
          </Typography>
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <Button
              onClick={handleImageClick}
              sx={{
                width: '24px',
                height: '24px',
                minWidth: '24px',
                mr: 3,
              }}
            >
              {isButtonEnabled ? (
                <Image
                  src="/svgs/pricing-option.svg"
                  alt="pricingoption icon"
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  src="/svgs/pricing-option-disable.svg"
                  alt="pricingoption icon"
                  width={24}
                  height={24}
                />
              )}
            </Button>
            <Link
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontSize: 16,
                textDecoration: 'underline',
                color: 'var(--color-gray-4)',
              }}
            >
              I agree to the terms and conditions.
            </Link>
          </Typography>
        </Box>
        <Button
          onClick={handleDelete}
          sx={{
            borderRadius: '12px',
            color: isButtonEnabled
              ? 'var(--color-white)'
              : 'var(--color-gray-3)',
            backgroundColor: isButtonEnabled
              ? 'var(--color-blue-main)'
              : 'var(--color-gray-1)',
            textTransform: 'none',
            fontSize: '18px',
            width: '100%',
            mx: 'auto',
            '&:hover': {
              backgroundColor: isButtonEnabled
                ? 'var(--color-blue-main)'
                : 'var(--color-gray-1)',
            },
          }}
          disabled={!isButtonEnabled}
        >
          Confirm Delete
        </Button>
      </Box>
      <DialogActions>
        <Button
          onClick={onCloseClick}
          sx={{
            position: 'absolute',
            top: 30,
            right: 30,
            minWidth: '20px',
            width: '20px',
            height: '20px',
            margin: 0,
            padding: 0,
          }}
        >
          <Image
            src="/svgs/close-receipt.svg"
            alt="close icon"
            width={22}
            height={22}
          />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAccountDialog;
