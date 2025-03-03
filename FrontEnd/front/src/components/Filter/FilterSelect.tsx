import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  useMediaQuery,
  useTheme,
} from '@mui/material';

interface FilterSelectProps {
  name: string;
  label: string;
  width: number | string;
  value: string;
  options: string[];
  onChange: (event: SelectChangeEvent<string>) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  name,
  label,
  value,
  width,
  options,
  onChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <FormControl
      variant="outlined"
      sx={{
        minWidth: width,
        width: value ? (isMobile ? 160 : 'auto') : width,
      }}
    >
      <InputLabel
        id={`${name}-label`}
        sx={{
          color: '#acacac', // placeholder 색상 설정
          transform: value ? 'translate(15px, -11px)' : 'translate(14px, 12px)', // y좌표 위로 이동
          mr: 5,
          fontSize: 14,
          zIndex: 10,
        }}
        shrink={!value} // 값이 없을 때만 placeholder로 나타남
      >
        {label}
      </InputLabel>
      <Select
        labelId={`${name}-label`}
        id={`${name}-select`}
        name={name}
        value={value}
        onChange={onChange}
        label={label}
        displayEmpty
        sx={{
          zIndex: 100,
          height: 46,
          '.MuiSelect-select': {
            fontSize: { xs: 14, sm: 15 },
            paddingTop: '14px',
            paddingBottom: '14px',
            whiteSpace: 'nowrap',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterSelect;
