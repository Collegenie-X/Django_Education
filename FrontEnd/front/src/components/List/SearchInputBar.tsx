import { Box, Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent } from 'react';

interface CustomSearchInputProps {
  formData: {
    search: string;
  };
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}

const SearchInputBar = ({
  formData,
  handleInputChange,
  handleSubmit,
}: CustomSearchInputProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        mx: 'auto',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <TextField
        fullWidth
        name="search"
        placeholder="Search products with keywords..."
        value={formData.search}
        onChange={handleInputChange}
        sx={{
          borderRadius: 30,
          bgcolor: '#fff',
          '& .MuiOutlinedInput-root': {
            borderRadius: 30,
            '& fieldset': {
              borderColor: 'transparent', // 기본 border 색상 투명 처리
            },
            '&:hover fieldset': {
              borderColor: 'transparent', // hover 시에도 투명 유지
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent', // 포커스 시에도 border 투명
            },
          },
        }}
        InputProps={{
          disableUnderline: true, // 밑줄 제거
          style: {
            padding: '0 15px',
            borderRadius: 30,
            height: 50,
          },
        }}
      />
      <Button
        onClick={handleSubmit}
        sx={{
          position: 'absolute',
          right: 0,
          width: 20,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SearchIcon sx={{ color: '#9A9A9A' }} />
      </Button>
    </Box>
  );
};

export default SearchInputBar;
