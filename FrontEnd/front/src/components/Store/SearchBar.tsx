'use client';
import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  onSearch: (searchQuery: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length === 0) {
      onSearch('');
    }
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchQuery.length < 2) {
      alert('The search query must be at least 2 characters long.');
      return;
    }

    if (searchQuery.length > 100) {
      alert('The search query must be within 100 characters.');
      return;
    }
    onSearch(searchQuery);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Input search text"
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
            onClick={handleSearchClick}
            style={{ cursor: 'pointer' }}
          >
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      value={searchQuery}
      onKeyDown={handleKeyDown}
      onChange={handleSearchChange}
      sx={{ width: '40%', backgroundColor: 'white' }}
    />
  );
};

export default SearchBar;
