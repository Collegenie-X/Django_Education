'use client';

import { RESPONSE_THEME } from '@/config/config';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: RESPONSE_THEME.SM,
      md: RESPONSE_THEME.MD,
      lg: RESPONSE_THEME.LG,
      xl: RESPONSE_THEME.XL,
    },
  },
  typography: {
    fontFamily: 'Pretendard',
  },
});

export default theme;
