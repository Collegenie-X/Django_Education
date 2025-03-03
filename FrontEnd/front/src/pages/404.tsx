import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
        minHeight: '100vh',
        backgroundColor: '#f4f4f9',
      }}
    >
      {/* Header */}
      <Header />

      {/* Main content */}
      <Box
        sx={{
          flexGrow: 1, // Make this box take up the remaining vertical space
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          px: 2,
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
      >
        <Footer />
      </Box>
    </Box>
  );
};

export default Custom404;
