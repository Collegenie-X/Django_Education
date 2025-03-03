// src/pages/store/[id].tsx

'use client';

import { useParams } from 'next/navigation';
import useStoreDetail from '@/hooks/useStoreDetail';
import DetailInfo from '@/components/Detail/DetailInfo';
import Reviews from '@/components/Detail/Reviews';
import RecommendedProducts from '@/components/Detail/RecommendedProducts';
import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  Button,
  Container,
} from '@mui/material';
import PriceSection from '@/components/Detail/PriceSection';
import { useRouter } from 'next/navigation';
import { usePricePage } from '@/hooks/usePricePage';
import PaymentCompleteDialog from '@/components/Payment/PaymentCompleteDialog';
import usePaymentStatus from '@/hooks/usePaymentStatus'; // Import the custom hook

const StoreDetail = () => {
  const params = useParams();
  const id = params?.id as string;

  const router = useRouter();

  const {
    paymentCompleteDialogOpen,
    isLoading,
    amount,
    setPaymentCompleteDialogOpen,
  } = usePricePage();

  const {
    data: storeData,
    isLoading: isDetailLoading,
    error,
  } = useStoreDetail(id);

  // Use the custom hook to fetch payment status
  const paymentStatus = usePaymentStatus(id);

  if (isDetailLoading || isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    const is404 = (error as Error).message.includes('404');

    if (is404) {
      return (
        <Box
          sx={{
            mt: 10,
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
              fontSize: { xs: 80, md: 120 }, // Responsive font size
              color: '#111',
              fontWeight: 'bold',
            }}
          >
            404
          </Typography>
          <Typography
            sx={{
              color: '#999',
              mt: 2,
              mb: 4,
              fontSize: { xs: 14, md: 18 },
              maxWidth: '600px',
            }}
          >
            Oops! We couldn't find the page you're looking for.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 4,
              px: 4,
              py: 1,
              border: '1px solid #59B7FE',
              boxShadow: 'none',
              color: '#59B7FE',
              borderRadius: 20,
              fontSize: { xs: 12, md: 13 },
              backgroundColor: '#E2F2FE',
              '&:hover': {
                backgroundColor: '#b9dffe',
              },
            }}
            onClick={() => {
              router.back();
            }}
          >
            Go Home
          </Button>
        </Box>
      );
    }

    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography color="error">
          An error occurred: {(error as Error).message}
        </Typography>
      </Box>
    );
  }

  if (!storeData) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography>This is not received data.</Typography>
      </Box>
    );
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: '#fff',
        px: { xs: 1, sm: 2, md: 2, lg: 5, xl: 5 },
        py: { xs: 2, sm: 3 },
        borderRadius: { sx: 3, sm: 3, md: 5 },
        position: 'relative',
      }}
    >
      <Grid container spacing={1}>
        {/* Main Content Section */}
        <Grid item xs={12} sm={8} md={8} lg={8} xl={9}>
          <DetailInfo store={storeData} />
          <Reviews
            problem_id={storeData?.id}
            isFree={storeData?.is_free}
            isPayment={paymentStatus?.isPayment || false}
          />
        </Grid>

        {/* Price Section */}
        <Grid item xs={12} sm={4} md={4} lg={4} xl={3}>
          <PriceSection
            data={storeData}
            isPayment={paymentStatus?.isPayment || false}
            fileUrl={paymentStatus?.fileUrl || null}
          />
        </Grid>
      </Grid>
      <RecommendedProducts search={storeData?.title} />

      <PaymentCompleteDialog
        dialogOpen={paymentCompleteDialogOpen}
        setDialogOpen={setPaymentCompleteDialogOpen}
        amount={amount}
      />
    </Container>
  );
};

export default StoreDetail;
