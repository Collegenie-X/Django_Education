// src/app/(HOME)/free/page.tsx
'use client';

import React from 'react';
import { Box, Grid, CircularProgress, Typography } from '@mui/material';
import CardItem from '@/components/Store/CardItem';
import CustomPagination from '@/components/Pagination';
import useFreeList from '@/hooks/useFreeList';
import { StoreProps } from '@/types/store';
import LoadingSkeleton from '@/components/Skeleton/LoadingSkeleton';

const FreeList: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const { data, error, isLoading } = useFreeList(page); // useFreeList 훅 사용

  const totalPages = data?.num_pages || 1; // 페이지 수를 데이터에서 가져옵니다.
  const items = data?.results || []; // 아이템 리스트를 가져옵니다.

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  return (
    <Box sx={{ px: { lg: 2, xl: 0.5 }, mt: 5 }}>
      {isLoading ? (
        <Box sx={{ mt: { xs: 2, sm: 7 }, ml: { xs: 4, sm: 0 } }}>
          <LoadingSkeleton array_columns={4} />
        </Box>
      ) : error ? (
        <Typography color="error" align="center" mt={5}>
          The error occurred while loading data: {error.message}
        </Typography>
      ) : (
        <>
          <Typography sx={{ ml: 3, fontSize: 18, color: '#9c9c9c' }}>
            {' '}
            {data.count + ' results found'}{' '}
          </Typography>
          <Grid container spacing={0.5}>
            {items.map((item: StoreProps) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={item.id}>
                <CardItem item={item} />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Pagination */}
      <CustomPagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
      />
    </Box>
  );
};

export default FreeList;
