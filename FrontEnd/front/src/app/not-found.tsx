'use client';

import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const Custom404 = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        backgroundColor: '#f4f4f9',
      }}
    >
      {/* Main content */}
      <Box
        sx={{
          textAlign: 'center',
          px: 2,
          py: 10,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 40, md: 60 }, // Responsive font size
            color: '#ff6b6b',
            fontWeight: 'bold',
          }}
        >
          404
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: '#999',
            mt: 2,
            mb: 4,
            fontSize: { xs: 18, md: 22 },
            maxWidth: '600px',
          }}
        >
          Oops! We couldn't find the page you're looking for.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            px: 4,
            py: 2,
            fontSize: { xs: 16, md: 18 },
            backgroundColor: '#007BFF',
            '&:hover': {
              backgroundColor: '#0056b3',
            },
          }}
          onClick={handleGoHome}
        >
          Go back to Homepage
        </Button>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: '#1f1f1f', // Ensure the footer has a black background
          width: '100%',
          color: '#fff',
        }}
      ></Box>
    </Box>
  );
};

export default Custom404;
