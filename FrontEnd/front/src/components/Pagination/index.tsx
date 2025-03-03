import React from 'react';
import { Pagination, PaginationItem, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface CustomPaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const StyledPaginationItem = styled(PaginationItem)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: '#4A90E2',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#4A90E2',
    },
  },
  '&': {
    borderRadius: '8px',
    margin: '0 5px',
    border: '1px solid #e0e0e0',
  },
}));

const CustomPagination: React.FC<CustomPaginationProps> = ({
  count,
  page,
  onChange,
}) => {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        color="primary"
        renderItem={(item) => <StyledPaginationItem {...item} />}
      />
    </Box>
  );
};

export default CustomPagination;
