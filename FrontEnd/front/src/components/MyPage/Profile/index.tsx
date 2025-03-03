// MyAccount.tsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  CircularProgress,
  Grid,
  SxProps,
} from '@mui/material';

import { cookieUtils } from '@/utiles/cookieUtils';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import DeleteAccountDialog from './DeleteAccountDialog';

import { useUserProfile } from '@/hooks/useUserProfile';
import { accountFields } from './config';
import { updateUsernameAPI } from '@/api/ApiUser'; // Adjust the import path accordingly

const textFieldStyles: SxProps = {
  backgroundColor: 'white',
  borderWidth: 0,
  borderRadius: 2,
  mt: 1,
  '& .MuiInputBase-input': {
    color: '#9c9c9c',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
  },
};

const MyAccount: React.FC = () => {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [dialogLoginOpen, setDialogLoginOpen] = useState<boolean>(false);
  const { setIsLoggedIn, setEmail } = useAuth();
  const { data: userProfile, isLoading, error, refetch } = useUserProfile(); // Added refetch

  // State for editable fields
  const [username, setUsername] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    if (userProfile) {
      setUsername(userProfile.username || '');
    }
  }, [userProfile]);

  useEffect(() => {
    if (error) {
      console.log('Error:', error);
      if (error.message.includes('401')) {
        setDialogLoginOpen(true);
      }
    }
  }, [error]);

  const logoutOnClick = async () => {
    const refresh = cookieUtils.getCookie('refresh');

    if (refresh) {
      try {
        cookieUtils.deleteCookie('token');
        cookieUtils.deleteCookie('refresh');

        cookieUtils.deleteCookie('username');
        cookieUtils.deleteCookie('email');

        setEmail('');
        setIsLoggedIn(false);

        router.replace('/');
        router.refresh();

        const loginEvent = new CustomEvent('userLoggedIn', {
          detail: { email: '' },
        });
        window.dispatchEvent(loginEvent); // 이벤트 발행
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  };

  const handleSave = async () => {
    // Basic validation
    if (!username.trim()) {
      alert('Username cannot be empty.');
      return;
    }

    // Additional validation can be added here (e.g., regex for allowed characters)
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Example: 3-20 characters, alphanumeric and underscores
    if (!usernameRegex.test(username)) {
      alert(
        'Username must be 3-20 characters long and can only include letters, numbers, and underscores.',
      );
      return;
    }

    setIsSaving(true);

    try {
      const result = await updateUsernameAPI(username);
      cookieUtils.setCookie('username', result.user.username, 1);
      alert('Username updated successfully.');
      refetch();
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('An unexpected error occurred while updating the username.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box sx={{ px: { sm: 2, md: 5 } }}>
      <Typography gutterBottom sx={{ fontSize: 28 }}>
        Profile
      </Typography>
      <Divider sx={{ borderBottomWidth: 4, background: '#ececec' }} />

      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '25vh',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Stack spacing={4} sx={{ mt: 5 }}>
            <Grid container spacing={2} justifyContent="center">
              <Box sx={{ width: '90%', mx: 'auto', justifyContent: 'center' }}>
                {accountFields.map((field) => (
                  <Grid item xs={12} sm={10} md={9} key={field.valueKey} mt={1}>
                    <Typography>{field.label}</Typography>
                    {field.valueKey === 'username' ? (
                      <TextField
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        InputProps={{ readOnly: false }}
                        sx={{
                          ...textFieldStyles,
                          backgroundColor: field.backgroundColor,
                        }}
                        variant="outlined"
                        fullWidth
                      />
                    ) : (
                      <TextField
                        value={
                          field.valueKey === 'email'
                            ? cookieUtils.getCookie('email') ||
                              userProfile?.email ||
                              ''
                            : field.valueKey === 'username'
                            ? cookieUtils.getCookie('username') ||
                              userProfile?.username ||
                              ''
                            : '******************' // 비밀번호 표시
                        }
                        InputProps={{ readOnly: field.readOnly }}
                        sx={{
                          ...textFieldStyles,
                          backgroundColor: field.backgroundColor,
                        }}
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  </Grid>
                ))}
              </Box>
            </Grid>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={isSaving}
              sx={{
                px: 2,
                my: 2,
                fontSize: 15,
                width: 100,
                alignSelf: 'flex-end',
                textTransform: 'lowercase',
                borderRadius: 2,
                border: '1px solid #8BCBFF',
                backgroundColor: '#F1F6FF',
                color: '#004B95',
                boxShadow: 'none',
                display: 'block', // 필요 시 보이도록 수정
                '&:hover': {
                  backgroundColor: '#b9dffe',
                  color: '#0047ab',
                  boxShadow: 'none',
                },
                position: 'relative',
              }}
            >
              {isSaving ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Save'
              )}
            </Button>
          </Stack>
        </Box>
      )}

      <Box sx={{ mt: 8, background: '#5c5c5c', height: 3, width: '100%' }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 2,
          color: '#9c9c9c',
        }}
      >
        <Typography
          sx={{ cursor: 'pointer' }}
          onClick={() => setIsDeleteDialogOpen(true)}
        >
          Delete Account
        </Typography>
        <Typography sx={{ cursor: 'pointer' }} onClick={logoutOnClick}>
          Logout
        </Typography>
      </Box>

      <DeleteAccountDialog
        dialogOpen={isDeleteDialogOpen}
        setDialogOpen={setIsDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      />
    </Box>
  );
};

export default MyAccount;
