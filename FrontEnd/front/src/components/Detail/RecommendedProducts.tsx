// components/RecommendedProducts.tsx
import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import CardItem from '@/components/Store/CardItem';
import useStoreProblems from '@/hooks/useStoreProblems';
import { StoreProps } from '@/types/store';

interface RecommendedProductsProps {
  search: string;
  grade?: string;
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({
  search,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { data, isLoading, isError, error } = useStoreProblems(search);
  const [showAll, setShowAll] = useState<boolean>(false);

  // 초기에는 4개, showAll이 true면 전체
  const sliceEnd = showAll
    ? undefined // Show all items
    : isSmallScreen
    ? 4 // For small screens, show up to index 4 (i.e., 3 items if starting at index 1)
    : 6; // For larger screens, show up to index 6

  // Adjust the slice indices as needed. For example, starting at index 0.
  const displayedProblems: StoreProps[] = showAll
    ? data || []
    : (data || []).slice(1, sliceEnd);

  const handleToggleShow = () => {
    setShowAll((prev) => !prev);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ mt: 10 }}>
        <Alert severity="error">Recommand Loading Error {error?.message}</Alert>
      </Box>
    );
  }

  return (
    <Box my={10} ml={3}>
      {/* Section title */}
      <Typography variant="h5" fontWeight="bold" gutterBottom mb={4}>
        Recommended Products for You
      </Typography>

      {/* Grid container for responsive layout */}
      <Grid
        container
        spacing={2}
        sx={{ width: { sm: '100%', md: '80%', lg: '70%' } }}
      >
        {displayedProblems.map((problem) => (
          <Grid item xs={12} sm={6} md={6} lg={4} xl={4} key={problem.id}>
            <CardItem item={problem} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecommendedProducts;
